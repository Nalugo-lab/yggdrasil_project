import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) { 
  if(request.nextUrl.pathname == "/" && request.cookies.get("AccessToken")){
    return NextResponse.redirect(new URL("/plants/list", request.url));
  }
  if(request.nextUrl.pathname == "/register" && request.cookies.get("AccessToken")){
    return NextResponse.redirect(new URL("/", request.url));
  }
  if(request.nextUrl.pathname == "/login" && request.cookies.get("AccessToken")){
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.cookies.get("AccessToken") == 'null') {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/plants/:path*", "/", "/register", '/login'],
};