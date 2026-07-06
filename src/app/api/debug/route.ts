// src/app/api/debug/route.ts
export async function GET() {
  return Response.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlLength: process.env.DATABASE_URL?.length,
    dbUrlPrefix: process.env.DATABASE_URL?.slice(0, 30),
    nodeEnv: process.env.NODE_ENV,
    hasBetterAuthUrl: !!process.env.BETTER_AUTH_URL,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasTestVar: !!process.env.TEST_VAR,
    testVarValue: process.env.TEST_VAR,
  });
}