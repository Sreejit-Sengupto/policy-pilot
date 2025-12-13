"use client";

import React, { useEffect } from "react";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import LeftIllustration from "@/component/illustrations/left-illustration";
import RightIllustration from "@/component/illustrations/right-illustration";

export default function SignUpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get("redirectTo") ?? "/home";
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push(redirectTo);
    }
  }, [isSignedIn, redirectTo, router]);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#D6E5E3" }}>
      <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
        <LeftIllustration />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
      
          <SignUp />
        
      </div>

      <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
        <RightIllustration />
      </div>
    </div>
  );
}
