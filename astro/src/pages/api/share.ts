import { makeTempSnapshot } from '../../lib/db/account.ts'

export const POST: APIRoute = async ({ request }) => {
  let code: string
  try {
    const body = await request.json()
    if (typeof body.code !== 'string') throw 'Missing/invalid code'
    code = body.code
  } catch (error) {
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }

  // Make temporary snapshot?
  const snapshot = await makeTempSnapshot(code)
  return new Response(
    JSON.stringify({
      snapshotId: snapshot.id
    }),
    { status: 200 }
  )
}
