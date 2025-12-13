// client/app/components/SchemesPage.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileText, CheckCircle } from "lucide-react";
import EmptyState from "./emptystate";
import type { Profile } from "../app/lib/profile";
import { isProfileComplete } from "../app/lib/profile";
import Header from "./header";
import { eligibleSchemes, timelineSteps } from "../app/data/scheme";

export default function SchemesPage({ profile }: { profile?: Profile | null }) {
  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);

  // use the imported mock data
  const schemes = useMemo(() => eligibleSchemes, []);
  const timeline = useMemo(() => timelineSteps, []);

  // If profile missing or incomplete -> show empty state
  const profileComplete = isProfileComplete(profile);

  const toggleScheme = (id: number) => setExpandedScheme(expandedScheme === id ? null : id);

  if (!profileComplete) {
    return <EmptyState message="We couldn't find your profile. Complete your profile to see personalized schemes." />;
  }

  // Otherwise show schemes
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Your Eligible Schemes</h1>
          <p className="text-lg text-muted-foreground">
            Based on your profile, here are the government schemes you can apply for
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid gap-6 mb-16 max-w-5xl mx-auto">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="border-2 border-border hover:border-accent transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">{scheme.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{scheme.description}</p>
                  </div>
                  <div className="ml-4">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                </div>

                <Button onClick={() => toggleScheme(scheme.id)} variant="outline" className="w-full justify-between border-2 hover:bg-secondary">
                  <span className="font-semibold">{expandedScheme === scheme.id ? "Hide Details" : "View Required Documents"}</span>
                  {expandedScheme === scheme.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>

                {expandedScheme === scheme.id && (
                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      Required Documents
                    </h4>
                    <div className="space-y-3">
                      {scheme.documents.map((doc: any, idx: number) => (
                        <div key={idx} className="bg-secondary/30 rounded-lg p-4">
                          <p className="font-semibold text-primary mb-1">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">How to procure:</span> {doc.howToProcure}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-4">Start Application</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Your Application Timeline</h2>
          <div className="space-y-8">
            {timeline.map((step, idx) => (
              <div key={step.step} className="relative flex gap-6">
                {idx !== timeline.length - 1 && <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />}

                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step.status === "current"
                        ? "bg-accent text-accent-foreground"
                        : step.status === "completed"
                        ? "bg-muted-foreground text-white"
                        : "bg-secondary text-primary border-2 border-border"
                    }`}
                  >
                    {step.step}
                  </div>
                </div>

                <div className="flex-1 pb-8">
                  <Card className={`p-6 ${step.status === "current" ? "border-2 border-accent shadow-lg" : "border border-border"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          step.status === "current" ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"
                        }`}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
