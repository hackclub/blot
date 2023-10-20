import type { APIRoute } from 'astro'
import { getSession, makeArt } from '../../lib/db/account.ts'
import defaultExampleCode from '../../lib/examples/example.ts'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const session = await getSession(cookies)
  if (!session || !session.session.full) return redirect('/editor', 302)
  const art = await makeArt(
    session.user.id,
    false,
    undefined,
    defaultExampleCode
  )
  return redirect(`/~/${art.id}`, 302)
}
