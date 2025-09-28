import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";


dotenv.config();

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// console.log("SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
// console.log("SUPABASE_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

// export const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseUrl =
  process.env.SUPABASE_URL || import.meta.env?.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);