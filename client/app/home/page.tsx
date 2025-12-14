import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomeContent from "./homeContent";

export default async function Page() {
  const { userId } = await auth();

  // Middleware now handles protection for /home


  const profile = null;

  return <HomeContent profile={profile} />;
}
