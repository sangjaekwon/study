import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://awoddgfjcvnjxsvzdcbf.supabase.co";
const supabaseKey = "sb_publishable_f4zcVJVS4hu21ma36Q-07g_75R3AnZn";

export const supabase = createClient(supabaseUrl, supabaseKey);
