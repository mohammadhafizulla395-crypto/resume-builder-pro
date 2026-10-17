import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/resume"];
const AUTH_PAGES = ["/login", "/register"];

/**
 * Edge middleware: redirects unauthenticated users away from protected pages
 * and signed-in users away from auth pages. Session itself is verified
 * server-side (JWT via next-auth) on every request through `auth()`.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(
    req.cookies.get("__Secure-authjs.session-token")?.value ??
      req.cookies.get("authjs.session-token")?.value
  );

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/login", "/register"],
};
