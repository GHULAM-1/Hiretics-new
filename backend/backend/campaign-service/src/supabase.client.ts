import { config } from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_KEY must be defined in environment variables',
  );
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl as string,
  supabaseKey as string,
);
