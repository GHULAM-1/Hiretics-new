import { Controller, Post, Get, Patch, Body, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

interface CreateSubscriptionDto {
  user_id: string;
  plan: string;
}

interface UpdateSubscriptionDto {
  user_id: string;
  plan: string;
}

@Controller('subs')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() body: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(body);
  }

  @Get()
  findOne(@Query('user_id') userId: string) {
    return this.subscriptionService.getSubscription(userId);
  }

  @Patch()
  update(@Body() body: UpdateSubscriptionDto) {
    return this.subscriptionService.updateSubscription(body);
  }
}
