import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../supabase.client';

interface Applicant {
  age?: number;
  university?: string;
  city?: string;
}

@Injectable()
export class AnalyticsService {
  async getAgeStats() {
    const { data, error } = await supabase.from('applicants').select('age');

    if (error) {
      throw new InternalServerErrorException(
        'Failed to fetch age stats: ' + error.message,
      );
    }

    const counts = (data as Pick<Applicant, 'age'>[]).reduce(
      (acc, { age }) => {
        if (!age) return acc;
        acc[age] = (acc[age] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    return Object.entries(counts).map(([age, count]) => ({
      age: Number(age),
      count,
    }));
  }

  async getUniversityStats() {
    const { data, error } = await supabase
      .from('applicants')
      .select('university');

    if (error) {
      throw new InternalServerErrorException(
        'Failed to fetch university stats: ' + error.message,
      );
    }

    const counts = (data as Pick<Applicant, 'university'>[]).reduce(
      (acc, { university }) => {
        if (!university) return acc;
        acc[university] = (acc[university] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts).map(([university, count]) => ({
      university,
      count,
    }));
  }

  async getCityStats() {
    const { data, error } = await supabase.from('applicants').select('city');

    if (error) {
      throw new InternalServerErrorException(
        'Failed to fetch city stats: ' + error.message,
      );
    }

    const typedData = data as Pick<Applicant, 'city'>[];
    const total = typedData.length;

    const counts = typedData.reduce(
      (acc, { city }) => {
        if (!city) return acc;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts).map(([city, count]) => ({
      city,
      percentage: ((count / total) * 100).toFixed(2),
    }));
  }
}
