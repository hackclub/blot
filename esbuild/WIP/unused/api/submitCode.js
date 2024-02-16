export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    const { email , code } = body;

    // get email from database
    // check recent code for email
    // if code matches return okay
    // if not return not okay
    
    return new Response(JSON.stringify({}), { status: 200 });

  } catch (error) {
    return new Response(
      typeof error === 'string' ? error : 'Bad request body',
      { status: 400 }
    )
  }
}