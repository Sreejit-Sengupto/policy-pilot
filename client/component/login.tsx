// client/app/components/login.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Chrome } from "lucide-react";
import LeftIllustration from "./illustrations/left-illustration";
import RightIllustration from "./illustrations/right-illustration";

export default function Login() {
  const router = useRouter();

  const goSignUp = (e?: React.FormEvent) => {
    e?.preventDefault();
    router.push("/sign-up?redirectTo=/");
  };

  const goSignIn = () => {
    router.push("/sign-in?redirectTo=/");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#D6E5E3" }}>
      <header className="flex justify-between items-center px-8 py-6 border-b" style={{ borderColor: "rgba(202, 207, 214, 0.3)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFA726" }}>
            <div className="w-6 h-6 rounded-full bg-white" />
          </div>
          <span className="font-bold text-lg text-black">Red.</span>
        </div>

        <div className="flex gap-4">
          {/* social icons kept visual */}
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#CACFD6", color: "#424874" }} />
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#CACFD6", color: "#424874" }} />
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
          <LeftIllustration />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg">
            <h1 className="text-3xl font-bold text-black mb-2">Lets Start Learning</h1>
            <p className="text-sm mb-6" style={{ color: "#CACFD6" }}>Please login or sign up to continue</p>

            <form onSubmit={goSignUp} className="space-y-4 mb-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#A6B1E1" }} />
                <input type="email" placeholder="Your Email" className="w-full pl-10 pr-4 py-3 rounded-lg border-2" style={{ backgroundColor: "rgba(202,207,214,0.2)", borderColor: "rgba(202,207,214,0.5)", color: "#424874" }} />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#A6B1E1" }} />
                <input type="password" placeholder="Your Password" className="w-full pl-10 pr-4 py-3 rounded-lg border-2" style={{ backgroundColor: "rgba(202,207,214,0.2)", borderColor: "rgba(202,207,214,0.5)", color: "#424874" }} />
              </div>

              <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: "#FFA726" }}>
                Sign Up
              </button>
            </form>

            <button onClick={() => router.push("/sign-in?redirectTo=/")} className="w-full py-3 rounded-lg font-semibold border-2 flex items-center justify-center gap-2 mb-4" style={{ borderColor: "#CACFD6", color: "#424874", backgroundColor: "white" }}>
              <Chrome className="w-5 h-5" />
              Sign In / Google
            </button>

            <p className="text-center text-sm mt-6" style={{ color: "#CACFD6" }}>
              Already Have An Account?{" "}
              <button onClick={goSignIn} className="font-semibold" style={{ color: "#424874" }}>
                Login
              </button>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-end justify-center pb-8 px-4">
          <RightIllustration />
        </div>
      </div>
    </div>
  );
}