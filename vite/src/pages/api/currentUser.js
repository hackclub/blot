

export const GET = async ({ request, params }) => {

  // const authentication = params.authentication;

  // console.log(authentication);

  return new Response(
    JSON.stringify({
      email: "leo@hackclub.com",
      test: "field",
      request,
      params
    })
  )
}