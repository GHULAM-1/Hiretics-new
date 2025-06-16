import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { v4 as uuidv4 } from 'uuid';
import * as pdfParse from 'pdf-parse';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import {
  CVAnalysisResult,
  ApplicantData,
} from './interfaces/cv-analysis.interface';

dotenv.config();

@Injectable()
export class CvService {
  // ✅ Always use "resumes" bucket and create subfolders by campaignId
  private async getCvLink(
    file: Express.Multer.File,
    campaignId: string,
  ): Promise<string> {
    const bucketName = 'resumes';
    const filename = `${uuidv4()}.pdf`;
    const filePath = `${campaignId}/${filename}`; // subfolder path inside bucket

    // Upload into shared "resumes" bucket, with path like "campaignId/uuid.pdf"
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  private async getCvInfoAndScore(
    file: Express.Multer.File,
    campaignId: string,
  ): Promise<CVAnalysisResult> {
    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select('job_description')
      .eq('id', campaignId)
      .single();

    if (error || !campaign?.job_description) {
      throw new InternalServerErrorException('Could not fetch job description');
    }

    const jobDescription = campaign.job_description as string;

    const parsed = await pdfParse(file.buffer);
    const resumeText = parsed.text;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `Given the following resume and job description, extract the following:
- name
- email  
- city
- university
- age
Also, give a score from 1 to 100 based on how well the resume fits the job description.

Return JSON format:
{
  "name": "",
  "email": "",
  "city": "",
  "university": "",
  "age": 0,
  "score": 0
}

Job Description:
${jobDescription}

Resume:
${resumeText}`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

      const parsedData: Partial<CVAnalysisResult> = JSON.parse(
        cleanedText,
      ) as Partial<CVAnalysisResult>;

      return {
        name: parsedData.name || 'Unknown',
        email: parsedData.email || '',
        city: parsedData.city || '',
        age: parseInt(String(parsedData.age)) || 0,
        university: parsedData.university || '',
        score: parseInt(String(parsedData.score)) || 0,
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      throw new InternalServerErrorException('Failed to parse CV information');
    }
  }

  private async postApplicantData(applicant: ApplicantData): Promise<void> {
    const { error } = await supabase.from('applicants').insert(applicant);
    if (error) {
      throw new InternalServerErrorException(
        'Failed to insert applicant data: ' + error.message,
      );
    }
  }

  async processCv(
    file: Express.Multer.File,
    campaignId: string,
  ): Promise<{
    message: string;
    data: CVAnalysisResult & { cv_link: string; campaign_id: string };
  }> {
    try {
      const cvLink = await this.getCvLink(file, campaignId);
      const info = await this.getCvInfoAndScore(file, campaignId);

      await this.postApplicantData({
        name: info.name,
        email: info.email,
        cv_link: cvLink,
        age: info.age,
        campaign_id: campaignId,
        city: info.city,
        university: info.university,
        score: info.score,
      });

      return {
        message: 'CV processed successfully',
        data: {
          ...info,
          cv_link: cvLink,
          campaign_id: campaignId,
        },
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Failed to process CV: ' + errorMessage,
      );
    }
  }

  async getRankedCvs(campaignId: string): Promise<
    Array<{
      name: string;
      email: string;
      cv_link: string;
    }>
  > {
    console.log('🔍 Searching for applicants with campaign_id:', campaignId);

    // First, let's check if there are any applicants at all
    const { data: allApplicants } = await supabase
      .from('applicants')
      .select('*');

    console.log('📊 Total applicants in database:', allApplicants?.length || 0);
    if (allApplicants && allApplicants.length > 0) {
      console.log('📋 Sample applicant data:', allApplicants[0]);
    }

    const { data, error } = await supabase
      .from('applicants')
      .select('name, email, cv_link, score, campaign_id')
      .eq('campaign_id', campaignId)
      .order('score', { ascending: false });

    console.log('🎯 Filtered applicants for campaign:', data?.length || 0);
    console.log('🔎 Filtered applicants data:', data);

    if (error) {
      console.error('❌ Database error:', error);
      throw new InternalServerErrorException(
        'Failed to fetch applicants: ' + error.message,
      );
    }

    const result = (data || []).map(
      (applicant: { name: string; email: string; cv_link: string }) => ({
        name: applicant.name,
        email: applicant.email,
        cv_link: applicant.cv_link,
      }),
    );

    console.log('✅ Final result:', result);
    return result;
  }
}
