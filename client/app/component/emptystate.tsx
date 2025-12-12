"use client";

import Link from "next/link";
import Header from "./header";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <Header />
      <h2 className="text-3xl font-bold text-primary mb-4">No Schemes Available</h2>
      <p className="text-muted-foreground mb-8">{message}</p>

      <div className="flex justify-center gap-4">
        <Link
          href="/profile"
          className="px-6 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Complete Profile
        </Link>

        <Link
          href="/"
          className="px-6 py-2 rounded-lg bg-secondary text-primary hover:bg-secondary/80"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
