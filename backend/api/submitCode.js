import { supabase } from "./supabase.js";

export default async function(req, res) {
  const { code, email } = req.body;

  try {
    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('login_code', code)
      .single();

    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    // TODO: check that session isn't expired
    // check the email matches
    console.log("session", session, session.id, session.user);

    res.send({
      sessionKey: session.id,
      email: session.user
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}