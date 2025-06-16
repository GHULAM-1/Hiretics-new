import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../supabase.client';

@Injectable()
export class SubscriptionService {
  // ✅ Create subscription
  async createSubscription(body: { user_id: string; plan: string }) {
    const { user_id, plan } = body;

    const { error } = await supabase
      .from('subscription')
      .insert({ user_id, plan });

    if (error) {
      throw new InternalServerErrorException(
        'Failed to create subscription: ' + error.message,
      );
    }

    return { message: 'Subscription created', user_id, plan };
  }

  // ✅ Get subscription by user_id
  async getSubscription(userId: string) {
    const { data, error } = await supabase
      .from('subscription')
      .select('plan')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new InternalServerErrorException(
        'Failed to fetch subscription: ' + error.message,
      );
    }

    return {
      user_id: userId,
      plan: (data as { plan: string } | null)?.plan || null,
    };
  }

  // ✅ Update subscription
  async updateSubscription(body: { user_id: string; plan: string }) {
    const { user_id, plan } = body;

    const { error } = await supabase
      .from('subscription')
      .update({ plan })
      .eq('user_id', user_id);

    if (error) {
      throw new InternalServerErrorException(
        'Failed to update subscription: ' + error.message,
      );
    }

    return { message: 'Subscription updated', user_id, plan };
  }
}
