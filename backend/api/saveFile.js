import checkValidSession from "./checkValidSession.js";
import { supabase } from "./supabase.js";
import { PostHog } from "posthog-node";

const client = await new PostHog(process.env.POSTHOG_API_KEY, {
  host: "https://us.i.posthog.com",
});

export default async function (req, res) {
  const { sessionKey, email, file, name, fileId } = req.body;

  console.log("try to save", { sessionKey, email, file, name, fileId });

  try {
    let { data: session, error: userError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionKey)
      .single();

    if (userError && userError.message !== "No rows found") {
      throw userError;
    }

    const isValid = checkValidSession(session, { email });
    if (!isValid) {
      return;
    }

    console.log("session was valid");

    if (fileId === null) {
      console.log("insert new file");

      const { data: savedFile2, error: newUserError } = await supabase
        .from("files")
        .insert([
          {
            content: file,
            name,
            user: email,
          },
        ])
        .select();

      console.log(savedFile2, newUserError);

      res.send({ fileId: savedFile2[0].id });

      //posthog stuff
      await client.capture({
        distinctId: email,
        event: "User Saved New File",
      });
      await client.shutdown();

      return;
    }

    console.log("update existing file");

    const { data: savedFile, error } = await supabase
      .from("files")
      .upsert({
        id: fileId,
        content: file,
        name,
        user: email,
      })
      .select();

    //posthog stuff
    await client.capture({
      distinctId: email,
      event: "User Saved To Existing File",
    });
    await client.shutdown();

    if (savedFile !== null) {
      res.send({ fileId: savedFile[0].id });
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
