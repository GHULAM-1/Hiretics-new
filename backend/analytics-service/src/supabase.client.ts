import { config } from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

config();

function getSupabaseConfig(): { url: string; key: string } {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_KEY must be defined in environment variables',
    );
  }

  return { url: supabaseUrl, key: supabaseKey };
}

const { url, key } = getSupabaseConfig();

export const supabase: SupabaseClient = createClient(url, key);
