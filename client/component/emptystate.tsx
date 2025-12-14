"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileQuestion,
  Info,
  Calendar,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import Header from "./header";

interface EmptyStateProps {
  title?: string;
  message: string;
}

export default function EmptyState({
  title = "No Schemes to Show Yet",
  message,
}: EmptyStateProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-4">
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <Card className="max-w-lg w-full p-12 text-center shadow-lg border-border">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-secondary/40 blur-xl" />
                <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
                <div className="relative bg-secondary/50 rounded-full p-8">
                  <FileQuestion
                    className="h-16 w-16 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {message}
            </p>
            <Link href="/profile">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-lg font-semibold rounded-lg mb-4 transition-all duration-200 hover:scale-105 shadow-md">
                Complete Your Profile
              </Button>
            </Link>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <Info className="h-4 w-4" />
              Why do we need this information?
            </button>
            {showInfo && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed text-left">
                  Your profile information helps us match you with relevant
                  government schemes based on eligibility criteria such as age,
                  location, category, and income level. This data is used only
                  to personalize your experience and is not shared with third
                  parties.
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-10 py-20 bg-card rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Why Choose PolicyPilot?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Personalized Recommendations
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get matched with government schemes based on your unique profile
              and eligibility criteria.
            </p>
          </Card>

          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ClipboardList className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Step-by-Step Guidance
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Clear instructions on required documents and how to obtain them
              for each scheme.
            </p>
          </Card>

          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Timeline Planning
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Track your application progress with estimated timelines for each
              step of the process.
            </p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-primary mb-16">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {[
            {
              step: "1",
              title: "Login",
              desc: "Create your account or sign in",
            },
            {
              step: "2",
              title: "Fill Profile",
              desc: "Complete your eligibility profile",
            },
            {
              step: "3",
              title: "View Schemes",
              desc: "Discover eligible schemes",
            },
            {
              step: "4",
              title: "Follow Timeline",
              desc: "Track your application",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>

              {idx < 3 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-muted" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
              <span className="text-xl font-bold text-primary">
                PolicyPilot
              </span>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 PolicyPilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
