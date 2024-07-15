export default function(session, ops = {}) {
  const email = ops.email ?? null;

  console.log("check this session:", { session, email });

  // check that email matches session email
  if (email !== null && session.user !== email) {
    console.log("email doesn't match user");
    return false;
  }

  // check that the session is valid
  if (session.valid === false) {
    console.log("session was logged out");
    return false;
  }

  // check that last sign-in on session was within 2 weeks
  const lastUsed = new Date(session.last_used);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  if (lastUsed < twoWeeksAgo) {
    console.log("session last used more than 2 weeks ago");
    return false;
  }

  return true;
}