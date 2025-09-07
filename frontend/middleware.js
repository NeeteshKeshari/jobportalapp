// middleware.js
import { NextResponse } from "next/server";

export default function middleware(request) {
  const loggedIn = request.cookies.get("token");

//   if (!loggedIn && request.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

  return NextResponse.next();
}
