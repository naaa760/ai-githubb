import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent } from "next/server";

export default async function customMiddleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const result = await clerkMiddleware()(req, event);

  // Add custom logic, such as logging or conditional behavior
  if (req.nextUrl.pathname.startsWith("/admin")) {
    console.log("Admin route accessed");
    // Add extra checks or behavior
  }

  return result;
}

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:html?|css|js|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
