import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomeContent from "./homeContent";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in?redirectTo=/home");
  }

  const profile = null; 

  return <HomeContent profile={profile} />;
}
