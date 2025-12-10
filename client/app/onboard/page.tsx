// app/onboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardPage() {
  // ⬅ auth() must be awaited
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirectTo=/onboard");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Onboarding</h1>
      <p>You are signed in as user: {userId}</p>
    </div>
  );
}
