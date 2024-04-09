import { supabase } from "./supabase.js";

export default async function(req, res) {
  // this should check session code
  const { email } = req.body;

  console.log("sign up:", email);

  try {

    const { data, error } = await supabase
      .from('sign_ups')
      .insert([{ email }])
      .single();

    if (sessionError) {
      throw sessionError;
    }

    res.send({ ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}