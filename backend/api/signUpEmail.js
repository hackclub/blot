import { supabase } from "./supabase.js";
import { LoopsClient } from "loops";
import { PostHog } from "posthog-node";

export default async function (req, res) {
  const { email } = req.body;

  console.log("sign up:", email);

  try {
    const { data, error } = await supabase
      .from("sign_ups")
      .insert([{ email }])
      .single();

    if (error) {
      console.log("error inserting email in supabase", error);
    }

    try {
      addToEmailList(email);
    } catch (error) {
      console.log("Erred adding loop email:", error);
    }

    res.send({ ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const loops = await new LoopsClient(process.env.LOOPS_API_KEY);

const client = await new PostHog(process.env.POSTHOG_API_KEY, {
  host: "https://us.i.posthog.com",
});

const findOrCreateEmailListContact = async (email) => {
  const foundContacts = await loops.findContact(email);

  if (foundContacts.length == 0) { // if the contact isn't already in the DB
    
    //posthog stuff
    await client.capture({
      distinctId: email,
      event: "User Requested Stickers",
    });
    await client.shutdown();

    // add to loops db
    return await loops.createContact(email, {
      source: "Blot editor",
      userGroup: "Hack Clubber",
      blotRequestedStickersAt: new Date(),
    });
  } else {
    return foundContacts[0];
  }
};

const addToEmailList = async (email) => {
  await findOrCreateEmailListContact(email);
  await loops.updateContact(email, {
    blotRequestedStickersAt: new Date(),
  });
};
