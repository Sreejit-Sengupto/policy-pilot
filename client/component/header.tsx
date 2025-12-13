"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
          <span className="text-2xl font-bold text-primary">PolicyPilot</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          
          {/* When signed OUT */}
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-secondary">
                Login
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Sign Up
              </Button>
            </Link>
          </SignedOut>

          {/* When signed IN */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
