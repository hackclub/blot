import _sendgrid from '@sendgrid/mail'
import type { Art, User } from './account.ts'
import { lazy } from '../utils/lazy.ts'

export const isValidEmail = (email: string): boolean =>
  /^\S+@\S+\.\S+$/.test(email)

const sendgrid = lazy(() => {
  _sendgrid.setApiKey(import.meta.env.SENDGRID_API_KEY)
  return _sendgrid
})

interface EmailSpec {
  subject: string
  html: string
  text: string
}

export const mail = async (to: string, spec: EmailSpec): Promise<void> => {
  await sendgrid.send({
    from: 'Hack Club Blot <blot@hackclub.com>',
    replyTo: 'Hack Club <team@hackclub.com>',
    to,
    ...spec
  })
}

export const loginCodeTemplate = (code: string): EmailSpec => ({
  subject: `Blot Login Code: ${code}`,
  html: `
        <p>Here's your Blot login code:</p>
        <h1>${code}</h1>
        <p><small>(Not you? You can safely ignore this email.)</small></p>
    `,
  text: [
    `Here's your Blot login code: ${code}`,
    '',
    '(Not you? You can safely ignore this email.)'
  ].join('\n')
})

export const tempTemplate = (user: User, art: Art): EmailSpec => {
  const loginUrl = `https://blot.hackclub.com/login?email=${encodeURIComponent(
    user.email
  )}&to=${encodeURIComponent(`/~/${art.id}`)}`
  return {
    subject: 'How to access your art | Blot',
    html: `
			<p>Hi! You started working on a program in <a href="https://blot.hackclub.com">Blot</a>, and we made you an account if you ever want to keep working on it.</p>
			<p>Program name: <strong>${art.name ?? 'Untitled'}</strong></p>
			<p>To edit your art in the future, just head to <a href="${loginUrl}">${loginUrl}</a></p>
			<p>Happy hacking!</p>
			<p><small>(Not you? You can safely ignore this email and/or delete the program. Your Blot account is safe and only you can log in.)</small></p>
		`,
    text: [
      'Hi! You started working on a program in Blot, and we made you an account if you ever want to keep working on it.',
      '',
      `Program name: ${art.name ?? 'Untitled'}`,
      '',
      `To edit your program in the future, just head to ${loginUrl}`,
      '',
      'Happy hacking!',
      '',
      '(Not you? You can safely ignore this email and/or delete the program. Your Blot account is safe and only you can log in.)'
    ].join('\n')
  }
}
