import { supabase } from "./supabase.js";

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