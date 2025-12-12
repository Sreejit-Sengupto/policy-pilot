"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ClipboardList, Calendar, ArrowRight } from "lucide-react";
import HeroIllustration from "../component/illustrations/hero-illustration";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" aria-label="PolicyPilot home">
            <div className="relative h-10 w-10 rounded-full bg-accent flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white" />
            </div>
            <span className="text-2xl font-bold text-primary">PolicyPilot</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/sign-in?redirectTo=/home">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-secondary" aria-label="Sign in">
                Login
              </Button>
            </Link>

            <Link href="/sign-up?redirectTo=/home">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Sign up">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-primary leading-tight text-balance">
              Find the Right Government Schemes Easily
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              PolicyPilot helps you discover government schemes you're eligible for, guides you through the application
              process, and tracks your progress every step of the way.
            </p>

            <Link href="/sign-up?redirectTo=/">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" aria-label="Get started">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Why Choose PolicyPilot */}
      <section className="container mx-auto px-10 py-20 bg-card rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Why Choose PolicyPilot?</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Personalized Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get matched with government schemes based on your unique profile and eligibility criteria.
            </p>
          </Card>

          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ClipboardList className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Step-by-Step Guidance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Clear instructions on required documents and how to obtain them for each scheme.
            </p>
          </Card>

          <Card className="p-8 border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Timeline Planning</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track your application progress with estimated timelines for each step of the process.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-primary mb-16">How It Works</h2>

        <div className="grid gap-8 md:grid-cols-4">
          {[
            { step: "1", title: "Login", desc: "Create your account or sign in" },
            { step: "2", title: "Fill Profile", desc: "Complete your eligibility profile" },
            { step: "3", title: "View Schemes", desc: "Discover eligible schemes" },
            { step: "4", title: "Follow Timeline", desc: "Track your application" },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>

              {idx < 3 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-muted" />}
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
              <span className="text-xl font-bold text-primary">PolicyPilot</span>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">© 2025 PolicyPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

