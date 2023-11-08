import type { APIRoute } from 'astro'
import type { User } from '../../../db/account.ts'
import {
  getSession,
  getUserByEmail,
  makeArt,
  makeOrUpdateSession,
  makeUser
} from '../../../db/account.ts'
import { isValidEmail, mail, tempTemplate } from '../../../db/email.ts'
import { assessCaptcha } from '../../../lib/utils/recaptcha.ts'

export const POST: APIRoute = async ({ request, cookies }) => {
  let name: string
  let code: string
  let partialSessionEmail: string | null // For temp programs
  let recaptchaToken: string
  let tutorialName: string | undefined
  try {
    const body = await request.json()
    if (body.name && typeof body.name !== 'string') throw 'Invalid name'
    name = body.name
    if (body.code && typeof body.code !== 'string') throw 'Invalid code'
    code = body.code
    if (
      body.partialSessionEmail &&
      (typeof body.partialSessionEmail !== 'string' ||
        !isValidEmail(body.partialSessionEmail))
    )
      throw 'Invalid email'
    partialSessionEmail = body.partialSessionEmail
    if (body.recaptchaToken && typeof body.recaptchaToken !== 'string')
      throw 'Invalid recaptcha token'
    recaptchaToken = body.recaptchaToken
    tutorialName = body.tutorialName
  } catch (error) {
    console.error(error)
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }

  let sessionInfo = await getSession(cookies)
  let user: User
  let unprotected: boolean
  if (partialSessionEmail) {
    const recaptchaScore = await assessCaptcha(recaptchaToken, 'PERSIST_ART')
    if (recaptchaScore < 0.3)
      return new Response(`Recaptcha score too low (${recaptchaScore})`, {
        status: 400
      })

    user =
      (await getUserByEmail(partialSessionEmail)) ??
      (await makeUser(partialSessionEmail, null))
    unprotected = true
    sessionInfo = await makeOrUpdateSession(cookies, user.id, 'email')
  } else if (sessionInfo && sessionInfo.session.full) {
    user = sessionInfo.user
    unprotected = false
  } else {
    return new Response('Unauthorized', { status: 401 })
  }

  const art = await makeArt(
    user.id,
    unprotected,
    name ?? undefined,
    code ?? undefined,
    tutorialName
  )
  if (unprotected) await mail(user.email, tempTemplate(user, art))
  return new Response(JSON.stringify({ art, sessionInfo }), { status: 200 })
}
