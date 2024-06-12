import { ClerkMiddlewareAuth, auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";


const isMatched = createRouteMatcher(["/menu(.*)"])

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
    if (isMatched(req)) {
        auth().protect()
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};