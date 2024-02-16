import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { firestore, getArt, getSession } from '../../../db/account.ts'

export const POST: APIRoute = async ({ request, cookies }) => {
  let code: string
  let artId: string
  let tutorialName: string | undefined
  try {
    const body = await request.json()
    if (typeof body.code !== 'string') throw 'Missing/invalid code'
    code = body.code
    if (typeof body.artId !== 'string') throw 'Missing/invalid program id'
    artId = body.artId
    tutorialName =
      typeof body.tutorialName === 'string' ? body.tutorialName : undefined
  } catch (error) {
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }

  const art = await getArt(artId)
  if (!art) return new Response('Program does not exist', { status: 404 })

  let trackingId = art.id
  let trackingType = 'art'
  const trackingDate = new Date().toDateString()

  if (!art.unprotected) {
    const session = await getSession(cookies)
    if (!session) return new Response('Unauthorized', { status: 401 })
    if (session.user.id !== art.ownerId)
      return new Response(`Can't edit a piece of art you don't own`, {
        status: 403
      })
    trackingId = session.user.id
    trackingType = 'user'
  }

  await firestore
    .collection('art')
    .doc(artId)
    .update({
      code,
      modifiedAt: Timestamp.now(),
      tutorialName: tutorialName ?? null
    })
  await firestore
    .collection('daily-edits')
    .doc(`${trackingId}-${trackingDate}`)
    .set({
      type: trackingType,
      id: trackingId,
      date: Timestamp.now()
    })
  return new Response(JSON.stringify({}), { status: 200 })
}
