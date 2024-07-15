import { supabase } from "./supabase.js";
import checkValidSession from "./checkValidSession.js";

export default async function(req, res) {
  const { sessionKey, content, email } = req.body;


  try {
    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionKey)
      .single();

    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    const isValid = checkValidSession(session, { email });
    if (!isValid) {
      return;
    }

    if (session.user !== email) return;

    const { data: savedFile, error } = await supabase
      .from("share_link")
      .insert({ 
        content: content 
      })
      .select();

    const id = savedFile[0].id;

    console.log("created share link. id is", id)
    res.send({ id });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}