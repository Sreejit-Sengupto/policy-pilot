// client/app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "./landing/page";

export const metadata = {
  title: "PolicyPilot — Smart Scheme Finder",
};

export default async function Page() {
  const { userId } = await auth();

  // If user is logged in → redirect to /home
  if (userId) {
    redirect("/home");
  }

  // If user is NOT logged in → show Landing Page
  return <LandingPage />;
}
