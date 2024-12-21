import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/',  // Public route
    '/api/webhooks/clerk',  // Public webhook route
    '/((?!.+\\.[\\w]+$|_next).*)',  // Matches all dynamic routes except static files
    '/(api|trpc)(.*)',  // Apply middleware to API routes
  ],
};
