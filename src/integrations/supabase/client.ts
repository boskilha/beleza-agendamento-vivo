// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://joiearysjrbnvziqidfr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaWVhcnlzanJibnZ6aXFpZGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Nzc4MzUsImV4cCI6MjA2MjA1MzgzNX0.D0vglfbxRYIon9FW1uzRzXz8oVWBYgvES-M7wPJ7E8I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);