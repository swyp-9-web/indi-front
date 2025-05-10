export async function GET() {
  return Response.json({
    hasDummyLogin: process.env.HAS_DUMMY_LOGIN === 'true',
  });
}
