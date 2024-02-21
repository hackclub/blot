import { supabase } from "./supabase.js";
import crypto from 'crypto';
import { sendCode } from "./sendCode.js";

export default async function(req, res) {
  // this should check session code
  const { email } = req.body;

  console.log("logging in:", email);

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  try {

    console.log("check in database");
    // check if email is in database
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError && userError.message !== 'No rows found') {
      console.log("creating user:", email);
      const { data: newUser, error: newUserError } = await supabase
        .from('users')
        .insert([{ email }])
        .single();

      if (newUserError) {
        throw newUserError;
      }

      user = newUser;
    }

    console.log("user:", user);

    const login_code = crypto.randomBytes(4).toString('hex');

    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .insert([{ user: email, login_code }])
      .single();

    if (sessionError) {
      throw sessionError;
    }

    // send login email
    sendCode(email, login_code);
    console.log("sent login email", { email, login_code });

    res.send({ ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}