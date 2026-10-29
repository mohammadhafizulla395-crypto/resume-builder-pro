import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const PROTECTED_PREFIXES = ["/dashboard", "/resume"];
const AUTH_PAGES = ["/login", "/register"];

/**
 * Proxy (formerly "middleware"): runs before requests reach the app.
 *
 * 1. Route guard — unauthenticated users are kept off protected pages.
 * 2. Per-IP throttle on credential sign-ins — closes the gap where the
 *    per-email limiter inside authorize() can be dodged by rotating victim
 *    emails (credential stuffing), giving one IP only 15 attempts/minute.
 * 3. /api/auth/providers is intentionally NOT blocked: next-auth/react's
 *    signIn() calls getProviders() first and redirects to /api/auth/error
 *    when it fails, so blocking it broke every credentials login. The
 *    endpoint only echoes provider metadata that is public by design.
 * 4. Personalized pages are always `private, no-store` so the CDN can never
 *    cache user-specific HTML.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- endpoint hardening -------------------------------------------------
  if (pathname === "/api/auth/callback/credentials" && req.method === "POST") {
    const limited = rateLimit(clientKey(req, "login-ip"), 15, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Try again in a minute." },
        {
          status: 429,
          headers: { "Retry-After": "60", "Cache-Control": "private, no-store" },
        },
      );
    }
  }

  // --- session-based route guard ----------------------------------------
  const hasSession = Boolean(
    req.cookies.get("__Secure-authjs.session-token")?.value ??
      req.cookies.get("authjs.session-token")?.value
  );

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  // Personalized pages must never be cached at the CDN edge — HTML contains
  // the signed-in user's data. Mark every proxy-matched response private.
  const noStore = () => {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
    return res;
  };

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

  return isProtected || isAuthPage ? noStore() : NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/login",
    "/register",
    "/api/auth/callback/credentials",
  ],
};
