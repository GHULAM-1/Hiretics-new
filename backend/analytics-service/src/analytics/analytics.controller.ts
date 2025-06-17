import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('age')
  getAgeAnalytics() {
    return this.analyticsService.getAgeStats();
  }

  @Get('university')
  getUniversityAnalytics() {
    return this.analyticsService.getUniversityStats();
  }

  @Get('city')
  getCityAnalytics() {
    return this.analyticsService.getCityStats();
  }
}
