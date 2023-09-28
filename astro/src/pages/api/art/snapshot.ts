import type { APIRoute } from 'astro'
import { getArt, getSession, makeSnapshot } from '../../../lib/db/account.ts'

export const POST: APIRoute = async ({ request, cookies }) => {
  let artId: string
  try {
    const body = await request.json()
    if (typeof body.artId !== 'string') throw 'Missing/invalid art id'
    artId = body.artId
  } catch (error) {
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }

  const art = await getArt(artId)
  if (!art) return new Response('Program does not exist', { status: 404 })

  const session = await getSession(cookies)
  if (!session) return new Response('Unauthorized', { status: 401 })
  if (session.user.id !== art.ownerId)
    return new Response("Can't snapshot a piece of art you don't own!", {
      status: 403
    })

  const snapshot = await makeSnapshot(art)
  return new Response(
    JSON.stringify({
      snapshotId: snapshot.id
    }),
    { status: 200 }
  )
}
