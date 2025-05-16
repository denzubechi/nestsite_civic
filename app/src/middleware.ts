import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

export default authMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - nestport (your unprotected route)
     * - neststore (your unprotected route)
     * - .png (PNG image files)
     * - .jpg (JPG image files)
     * - .jpeg (JPEG image files)
     * - .svg (SVG image files)
     * - .gif (GIF image files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|nestport|neststore|\\.png$|\\.jpg$|\\.jpeg$|\\.svg$|\\.gif$).*)",
    "/dashboard",
  ],
};
