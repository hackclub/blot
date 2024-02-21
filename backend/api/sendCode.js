import _sendgrid from '@sendgrid/mail';

const sendgrid = _sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const sendCode = async (to, code) => {
  const spec = loginCodeTemplate(code);

  await sendgrid.send({
    from: 'Hack Club Blot <blot@hackclub.com>',
    replyTo: 'Hack Club <team@hackclub.com>',
    to,
    ...spec
  })
};

const loginCodeTemplate = (code) => ({
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
});

// export const POST = async ({ request }) => {

//   try {
//     const body = await request.json()

//     if (typeof body.email !== 'string' || !isValidEmail(body.email)) {
//       throw 'Missing/invalid email'
//     }
    
//     const email = body.email

//     console.log("email", email);

//     const code = await makeLoginCode(email);

//     console.log("code", code);

//     await mail(email, loginCodeTemplate(code));
    
//     return new Response(JSON.stringify({}), { status: 200 });

//   } catch (error) {
//     return new Response(
//       typeof error === 'string' ? error : 'Bad request body',
//       { status: 400 }
//     )
//   }
// }

// function makeLoginCode() {
//   // make random string

//   return "000000"
// }