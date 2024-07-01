import { supabase } from "./supabase.js";
import checkValidSession from "./checkValidSession.js";

export default async function(req, res) {
  const { sessionKey, email } = req.body;

  try {
    // Fetch the session from the database
    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionKey)
      .single();

    // Handle any error while fetching the session
    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    // Check if the session is valid
    const isValid = checkValidSession(session, { email });
    if (!isValid) {
      res.status(401).send({ error: 'Invalid session' });
      return;
    }

    // Update the session's valid column to false
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ valid: false })
      .eq('id', sessionKey);

    // Handle any error while updating the session
    if (updateError) {
      throw updateError;
    }

    // Send a successful response
    res.send({ message: 'Logged out successfully', email: session.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}