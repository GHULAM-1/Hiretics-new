import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { format } from 'date-fns';

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

  async updateCampaignStatuses() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const { data: campaigns, error } = await supabase
      .from('campaigns')
      .select('*');
    if (error) throw error;
    for (const campaign of campaigns) {
      let newStatus = campaign.status;
      if (campaign.start_date && campaign.end_date) {
        const startDate = format(new Date(campaign.start_date), 'yyyy-MM-dd');
        const endDate = format(new Date(campaign.end_date), 'yyyy-MM-dd');
        if (endDate < today) {
          newStatus = 'completed';
        } else if (startDate <= today) {
          newStatus = 'ongoing';
        } else {
          newStatus = 'not-started';
        }
      }
      if (newStatus !== campaign.status) {
        await supabase
          .from('campaigns')
          .update({ status: newStatus })
          .eq('id', campaign.id);
      }
    }
  }

  async findAll(isArchived?: boolean): Promise<Campaign[]> {
    await this.updateCampaignStatuses();
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('is_archived', isArchived);
    if (error) throw error;
    return data as Campaign[];
  }
  async findAllFavourite(): Promise<Campaign[]> {
    await this.updateCampaignStatuses();
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('is_favorite', true)
      .eq('is_archived', false);
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
    // 1. Update the campaign
    const { data, error } = await supabase
      .from('campaigns')
      .update({ ...dto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;

    // 2. Update the status for this campaign (not all campaigns)
    const today = format(new Date(), 'yyyy-MM-dd');
    let newStatus = data.status;
    if (data.start_date && data.end_date) {
      const startDate = format(new Date(data.start_date), 'yyyy-MM-dd');
      const endDate = format(new Date(data.end_date), 'yyyy-MM-dd');
      if (endDate < today) {
        newStatus = 'completed';
      } else if (startDate <= today) {
        newStatus = 'ongoing';
      } else {
        newStatus = 'not-started';
      }
    }
    if (newStatus !== data.status) {
      const { data: updated } = await supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single();
      return updated as Campaign;
    }

    // 3. Return the updated campaign
    return data as Campaign;
  }

  async remove(id: string): Promise<{ message: string }> {
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Campaign deleted successfully' };
  }
}
