import type { APIRoute } from 'astro'
import { firestore } from '../db/account.ts'

export const GET: APIRoute = async ({ redirect, cookies }) => {
  const sessionId = cookies.get('blotSession')?.value
  if (sessionId) await firestore.collection('sessions').doc(sessionId).delete()
  cookies.delete('blotSession', { path: '/' })
  cookies.delete('blotTempArt', { path: '/' })
  return redirect('/', 302)
}
