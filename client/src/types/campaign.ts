export interface Campaign {
  id?: string;
  name: string;
  company_name: string;
  job_role: string;
  job_description: string;
  status?: string;
  is_favorite?: boolean;
  is_archived?: boolean;
  start_date?: string;
  end_date?: string;
} 