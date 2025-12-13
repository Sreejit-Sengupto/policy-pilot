"use client";

import SchemesPage from "../../component/schemePage";

export default function HomeContent({ profile }: { profile: any }) {
  return (
    <div className="w-full min-h-screen">
      <SchemesPage profile={profile} />
    </div>
  );
}
