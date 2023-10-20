import type { APIRoute } from 'astro'
import { firestore, getArt, getSession } from '../../../lib/db/account.ts'

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
  if (!art) return new Response('Piece of art does not exist', { status: 404 })

  const session = await getSession(cookies)
  if (!session) return new Response('Unauthorized', { status: 401 })
  if (session.user.id !== art.ownerId)
    return new Response("Can't delete a piece of art you don't own", {
      status: 403
    })

  await firestore.collection('art').doc(artId).delete()
  return new Response(JSON.stringify({}), { status: 200 })
}
