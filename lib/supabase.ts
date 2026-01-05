import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client without strict typing to allow build without database
// Once your database is set up, you can add type safety back by importing Database type
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
