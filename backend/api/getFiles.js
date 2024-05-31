import { supabase } from "./supabase.js";

// TODO: this should not return content, add a get-file path for that
export default async function(req, res) {
  const { sessionKey } = req.body;

  try {
    // get session email TODO: should be user id

    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionKey)
      .single();

    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    // TODO: check that session isn't expired

    let { data: files, error: filesError } = await supabase
      .from('files')
      .select('*')
      .eq('user', session.user);

    if (filesError && filesError.message !== 'No rows found') {
      throw filesError;
    }

    console.log("Sending files in getFiles")

    res.send({ files });

  } catch (error) {
    console.log("throwing error in getFiles", error.message);
    res.status(500).send({ error: error.message });
  }
}