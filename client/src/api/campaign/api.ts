import { apiRequest } from "@/lib/api";
import { Campaign } from "@/types/campaign";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createCampaign(data: Campaign) {
  return apiRequest<Campaign>("/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const getCampaigns = async (isArchived?: boolean): Promise<Campaign[]> => {
  const queryParams = isArchived !== undefined ? `?is_archived=${isArchived}` : '';
  return apiRequest<Campaign[]>(`/campaigns${queryParams}`);
};
export const getFavouriteCampaigns = async (isFavourite?: boolean): Promise<Campaign[]> => {
  const queryParams = isFavourite !== undefined ? `?is_favourite=${isFavourite}` : '';
  return apiRequest<Campaign[]>(`/campaigns/favourite${queryParams}`);
};

export const getCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${BASE_URL}/campaigns/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign');
  }
  return response.json();
};

export const archiveCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${BASE_URL}/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_archived: true, status: 'completed' }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to archive campaign');
  }
  return response.json();
};

export const favoriteCampaign = async (id: string, isFavorite?: boolean): Promise<Campaign> => {
  const body: any = {};
  if (typeof isFavorite === "boolean") body.is_favorite = isFavorite;

  const response = await fetch(`${BASE_URL}/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to favorite campaign');
  }
  return response.json();
};

export const updateCampaign = async (id: string, data: any): Promise<Campaign> => {
  const response = await fetch(`${BASE_URL}/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update campaign');
  }
  return response.json();
}; 