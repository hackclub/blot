import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { firestore, getArt, getSession } from '../../../db/account.ts'

export const POST: APIRoute = async ({ request, cookies }) => {
  let artId: string
  let newName: string
  try {
    const body = await request.json()
    if (typeof body.artId !== 'string') throw 'Missing/invalid program id'
    artId = body.artId
    if (typeof body.newName !== 'string') throw 'Missing/invalid new name'
    newName = body.newName
  } catch (error) {
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }

  const art = await getArt(artId)
  if (!art) return new Response('Program does not exist', { status: 404 })

  if (!art.unprotected) {
    const session = await getSession(cookies)
    if (!session) return new Response('Unauthorized', { status: 401 })
    if (session.user.id !== art.ownerId)
      return new Response("Can't rename a piece of art you didn't make", {
        status: 403
      })
  }

  await firestore.collection('art').doc(artId).update({
    name: newName,
    modifiedAt: Timestamp.now()
  })
  return new Response(JSON.stringify({}), { status: 200 })
}
