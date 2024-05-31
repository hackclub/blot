import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rowaxzeiscproyjbnrxs.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
export let supabase; 

try {
    supabase = createClient(supabaseUrl, supabaseKey);
} catch (err) {
    console.log(err);
}
