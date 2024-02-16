import { supabase } from "./supabase.js";

export default async function(req, res) {
  const { sessionKey, email, file, name, fileId } = req.body;

  try {
    let { data: session, error: userError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionKey)
      .single();

    if (userError && userError.message !== 'No rows found') {
      throw userError;
    }

    if (session.user !== email) return;

    const { data: savedFile, error } = await supabase
      .from("files")
      .upsert({ 
        id: fileId, 
        content: file, 
        name, 
        user: email 
      })
      .select();

    if (savedFile !== null) {
      res.send({ fileId: savedFile[0].id });
      return;
    }

    const { data: savedFile2, error: newUserError } = await supabase
      .from('files')
      .insert([{ 
        content: file, 
        name, 
        user: email 
      }])
      .select();

    res.send({ fileId: savedFile2[0].id });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}