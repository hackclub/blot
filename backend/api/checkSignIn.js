import { supabase } from "./supabase.js";
import checkValidSession from "./checkValidSession.js";

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

    const isValid = checkValidSession(session);
    if (!isValid) {
      return;
    }

    // Update the last_used field to the current time
    const currentTime = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ last_used: currentTime })
      .eq('id', sessionKey);

    if (updateError) {
      throw updateError;
    }

    res.send({ email: session.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}