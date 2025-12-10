// client/app/components/HomeContent.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

/**
 * HomeContent (client)
 * - Shows "This is home page"
 * - If user is signed in, shows their name / id and a UserButton (Clerk)
 * - If user is signed out, shows buttons to go to Sign In / Sign Up pages (we push to internal routes)
 */
export default function HomeContent() {
  const router = useRouter();
  const { user } = useUser(); // may be undefined when signed out

  const goSignIn = () => {
    // navigate to your app sign-in page and ask it to return to '/'
    router.push("/sign-in?redirectTo=/");
  };

  const goSignUp = () => {
    router.push("/sign-up?redirectTo=/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">This is home page</h1>
        <p className="text-muted-foreground mb-6">
          Welcome — this is the landing page users should see after successful login.
        </p>

        <div className="flex items-center justify-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-3">
              {/* Show a friendly name (if available) and Clerk's UserButton for profile/sign-out */}
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-semibold text-foreground">
                  {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || user?.id || "User"}
                </p>
              </div>

              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <button
              onClick={goSignIn}
              className="px-5 py-2 rounded-lg border-2 border-border bg-card text-foreground font-medium hover:scale-105 transition"
            >
              Sign In
            </button>

            <button
              onClick={goSignUp}
              className="px-5 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:scale-105 transition"
            >
              Sign Up
            </button>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
