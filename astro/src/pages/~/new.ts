import type { APIRoute } from 'astro'
import { getSession, makeArt } from '../../db/account'
import defaultProgram from '../../lib/examples/defaultProgram'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const session = await getSession(cookies)
  if (!session || !session.session.full) return redirect('/editor', 302)
  const art = await makeArt(session.user.id, false, undefined, defaultProgram)
  return redirect(`/~/${art.id}`, 302)
}
