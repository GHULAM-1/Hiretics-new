import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export enum CampaignStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  NOT_STARTED = 'not-started',
  ARCHIVED = 'archived',
}

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsString()
  company_name: string;

  @IsString()
  job_role: string;

  @IsString()
  job_description: string;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;

  @IsOptional()
  @IsBoolean()
  is_archived?: boolean;
}
