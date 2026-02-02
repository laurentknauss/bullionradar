import { createClient } from "@supabase/supabase-js";

// Pour les scrapers, on utilise la service_role key pour INSERT
const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars");
  console.error("Set them in .env file or export them");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
