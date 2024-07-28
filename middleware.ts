// export { default } from "next-auth/middleware"; // Just adding this puts the whole app behond gate
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
// export const config = { matcher: ["/CreateUser", "/Public"] }; // This will force auth for pages in the array

export default withAuth(function middleware(req) {
  console.log(req.nextUrl.pathname);
  console.log(req.nextauth?.token?.role);

  // This could be used as a way to protect admin pages for example using 'startsWith'; Admin...
  if (
    // This example conditional only lets users with Admin role access CreateUser
    req.nextUrl.pathname.startsWith("/CreateUser") &&
    req.nextauth?.token?.role !== "ADMIN"
  ) {
    return NextResponse.rewrite(new URL("/Denied", req.url));
  }
});

export const config = { matcher: ["/CreateUser"] };
