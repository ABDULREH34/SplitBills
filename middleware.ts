import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude sign-in and sign-up routes
    '/((?!sign-in|sign-up|_next|[^?]*\\.(?:html?|css|js|png|svg)).*)',
    '/(api|trpc)(.*)',
  ],
};
