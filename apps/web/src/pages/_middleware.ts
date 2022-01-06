import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Get hostname (e.g. biolnk.me, app.biolnk.me )
  const hostname = req.headers.get("host");

  const DEV_HOST = "localhost:3000";
  const PROD_HOST = process.env.NEXT_PUBLIC_ROOT_URL;

  /**
   * If dev, get the custom domain/subdomain value by removing localhost:3000
   * If prod, get the custom domain/subdomain value by removing the root URL
   */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${PROD_HOST}`, "")
      : hostname.replace(`.${DEV_HOST}`, "");

  if (pathname.startsWith(`/p`)) {
    return NextResponse.rewrite(pathname);
  }

  if (
    !pathname.includes(".") && // exclude all files in the public folder
    !pathname.startsWith("/api") // exclude all API routes
  ) {
    if (currentHost == DEV_HOST || currentHost == PROD_HOST) {
      return NextResponse.rewrite(`/home${pathname}`);
    }

    /**
     * rewrite to the current hostname, the main logic will happen in
     * `pages/_pages/[page]/index.tsx`
     */
    return NextResponse.rewrite(`/p/${currentHost}${pathname}`);
  }
}
