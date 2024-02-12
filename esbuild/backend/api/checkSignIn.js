import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rowaxzeiscproyjbnrxs.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function(req, res) {
  const { sessionKey } = req.body;

  try {
    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionKey)
      .single();

    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    // TODO: check that session isn't expired
    console.log("checkSignIn session:", session);

    res.send({ email: session.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}