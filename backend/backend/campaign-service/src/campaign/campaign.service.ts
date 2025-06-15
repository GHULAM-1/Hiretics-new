import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

export interface Campaign {
  id: string;
  name: string;
  company_name: string;
  job_role: string;
  job_description: string;
  status?: string;
  is_favorite?: boolean;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class CampaignService {
  async create(dto: CreateCampaignDto): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([dto])
      .select()
      .single();
    if (error) throw error;
    return data as Campaign;
  }

  async findAll(): Promise<Campaign[]> {
    const { data, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
    return data as Campaign[];
  }

  async findOne(id: string): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Campaign;
  }

  async update(id: string, dto: UpdateCampaignDto): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ ...dto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Campaign;
  }

  async remove(id: string): Promise<{ message: string }> {
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Campaign deleted successfully' };
  }
}
