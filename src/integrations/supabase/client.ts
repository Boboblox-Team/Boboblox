// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://girurweqftroscythxje.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcnVyd2VxZnRyb3NjeXRoeGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzg5MjIsImV4cCI6MjA4NjY1NDkyMn0.NMsyx9RHaSTCtPvvpzwr-1ClZHO0l81OClgQNEJ6p2Q";

export const supabase = createClient<Database>(SUPABASE_URL, ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
