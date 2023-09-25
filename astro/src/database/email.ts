interface EmailSpec {
  subject: string
  html: string
  text: string
}

export const mail = async (to: string, spec: EmailSpec): Promise<void> =>
  await sendgrid.send({
    from: 'Hack Club Blot <blot@hackclub.com>',
    replyTo: 'Hack Club <team@hackclub.com>',
    to,
    ...spec
  })
