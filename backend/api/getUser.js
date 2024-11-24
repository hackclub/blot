import { supabase } from "./supabase.js";
import crypto from "crypto";
import { sendCode } from "./sendCode.js";
import { LoopsClient } from "loops";
import { PostHog } from "posthog-node";

export default async function (req, res) {
  // this should check session code
  const { email } = req.body;

  console.log("logging in:", email);

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    console.log("check in database");
    // check if email is in database
    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError && userError.message !== "No rows found") {
      console.log("creating user:", email);
      const { data: newUser, error: newUserError } = await supabase
        .from("users")
        .insert([{ email }])
        .single();

      if (newUserError) {
        throw newUserError;
      }

      user = newUser;
    }

    console.log("user:", user);

    const login_code = crypto.randomBytes(4).toString("hex");

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert([{ user: email, login_code }])
      .single();

    if (sessionError) {
      throw sessionError;
    }

    // send login email
    sendCode(email, login_code);
    console.log("sent login email", { email, login_code });

    try {
      console.log("running addToEmailList");
      addToEmailList(email);
    } catch (error) {
      console.log("Erred adding loop email:", error);
    }

    res.send({ ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// import email into loops db
const loops = await new LoopsClient(process.env.LOOPS_API_KEY);

//posthog init
const client = await new PostHog(process.env.POSTHOG_API_KEY, {
  host: "https://us.i.posthog.com",
});

const findOrCreateEmailListContact = async (email) => {
  const foundContacts = await loops.findContact(email);

  if (foundContacts.length == 0) {
    // if the contact isn't already in the DB

    console.log("sending posthog request...");
    await client.capture({
      distinctId: email,
      event: "User Signed Up for the Editor",
    });
    await client.shutdown();

    return await loops.createContact(email, {
      source: "Blot editor",
      userGroup: "Hack Clubber",
      blotEditorSignedUpAt: new Date(),
    });
  } else {
    return foundContacts[0];
  }
};

const addToEmailList = async (email) => {
  await findOrCreateEmailListContact(email);


  // honestly not sure if this works lol
  const contactInfo = await loops.findContact(email);
  if (!contactInfo[0].blotEditorSignedUpAt) { //if it's empty..
    //if user already signed up, don't overwrite
    await loops.updateContact(email, {
      blotEditorSignedUpAt: new Date(),
    });

    // posthog
    console.log("sending posthog request...");
    await client.capture({
      distinctId: email,
      event: "User Logged into the Editor",
    });
    await client.shutdown();
  }
};
