import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/',  // Public route
    '/api/webhooks/clerk',
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)', // Protect all routes except static files
    '/api/(.*)', // Always apply middleware for API routes
  ],
};
