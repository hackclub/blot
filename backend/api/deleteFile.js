import { supabase } from "./supabase.js";
import checkValidSession from "./checkValidSession.js";

export default async function(req, res) {
  const { sessionKey, email, fileId } = req.body;

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

    const { data: deletedFile, error } = await supabase
      .from("files")
      .delete()
      .eq('id', fileId)
      .eq('user', email);

    if (error) {
      throw error;
    }

    res.send({ message: 'File deleted successfully', fileId });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}