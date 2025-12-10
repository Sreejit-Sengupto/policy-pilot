// client/app/sign-in/[[...rest]]/page.tsx
"use client";

import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import LeftIllustration from "@/app/component/illustrations/left-illustration";
import RightIllustration from "@/app/component/illustrations/right-illustration";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get("redirectTo") ?? "/";
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      // on successful sign-in, send user to redirectTo
      router.push(redirectTo);
    }
  }, [isSignedIn, redirectTo, router]);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#D6E5E3" }}>
      <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
        <LeftIllustration />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        
          <SignIn />
        
      </div>

      <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
        <RightIllustration />
      </div>
    </div>
  );
}
