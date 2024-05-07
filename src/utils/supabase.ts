import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://szatscwyexkpeskgltzq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXRzY3d5ZXhrcGVza2dsdHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTM5NjQsImV4cCI6MjAyOTI4OTk2NH0.a_Wy7X6Z6PjKId33P2zC3oNbSbPPfh3OEqTt99uzU9Q";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
