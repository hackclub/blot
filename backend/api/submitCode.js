// This code checks for whether or not the code // session is legit or noty

import { supabase } from "./supabase.js";
import checkValidSession from "./checkValidSession.js";

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

    const isValid = checkValidSession(session, { email });
    if (!isValid) {
      res.status(500).send({ error: "invalid login code" });
      return;
    }
    
    res.send({
      sessionKey: session.id,
      email: session.user
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}