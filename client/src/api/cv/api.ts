// API to upload CV for a campaign
export async function uploadCV({ campaignId, file }: { campaignId: string; file: File }) {
  const formData = new FormData();
  formData.append('campaign_id', campaignId);
  formData.append('file', file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_APPLICANTS}/cv`, {
    method: 'POST',
    body: formData,
    // Do not set Content-Type header; browser will set it with boundary
    credentials: 'include', // if you need cookies
  });

  if (!response.ok) {
    throw new Error('Failed to upload CV');
  }

  return response.json();
}

export async function getApplicants(campaignId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_APPLICANTS}/cv?campaign_id=${campaignId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch applicants');
  }
  return response.json();
} 