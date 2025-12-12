"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, MapPin, UsersIcon, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";


type ProfileForm = {
  gender: string;
  age: number | "";
  marital_status: string;
  state: string;
  area: string;
  category: string;
  pwd: "yes" | "no";
  minority: "yes" | "no";
  student: "yes" | "no";
  bpl: "yes" | "no";
};

export function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileForm>({
    gender: "",
    age: "",
    marital_status: "",
    state: "",
    area: "",
    category: "",
    pwd: "no",
    minority: "no",
    student: "no",
    bpl: "no",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // convert age to number if the field is "age"
    if (name === "age") {
      const num = value === "" ? "" : Number(value);
      setFormData((s) => ({ ...s, [name]: num }));
      return;
    }

    // radio inputs set value as strings; ensure types align
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (
      !formData.gender ||
      formData.age === "" ||
      !formData.marital_status ||
      !formData.state ||
      !formData.area ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Prepare payload in expected backend format
    const payload = {
      gender: formData.gender,
      age: typeof formData.age === "number" ? formData.age : Number(formData.age),
      marital_status: formData.marital_status,
      state: formData.state,
      area: formData.area,
      category: formData.category,
      pwd: formData.pwd,
      minority: formData.minority,
      student: formData.student,
      bpl: formData.bpl,
    };

    // Try to POST to backend; if it fails, fallback to localStorage (dev)
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // fallback
        console.warn("Saving profile fallback to localStorage (api returned non-OK)");
        localStorage.setItem("policyPilot.profile", JSON.stringify(payload));
      }
    } catch (err) {
      console.warn("Saving profile to localStorage (no API)", err);
      localStorage.setItem("policyPilot.profile", JSON.stringify(payload));
    }

    // Redirect to /home after saving
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
<header className="border-b border-border bg-card sticky top-0 z-50">
  <div className="container mx-auto px-4 flex h-16 items-center justify-between">
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-10 w-10 rounded-full bg-accent flex items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-white" />
      </div>
      <span className="text-2xl font-bold text-primary">PolicyPilot</span>
    </Link>

    {/* Right-side: Profile + Logout */}
    <div className="flex items-center gap-4">
      {/* Shows avatar + dropdown with logout */}
      <UserButton afterSignOutUrl="/" />
    </div>
  </div>
</header>


      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">Step 2 of 3</span>
              <span className="text-sm text-muted-foreground">Complete Your Profile</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "66%" }} />
            </div>
          </div>

          <Card className="p-8 border-2 border-border shadow-lg">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary mb-2">Create Your Profile</h1>
              <p className="text-muted-foreground">Tell us about yourself to find schemes you're eligible for</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-primary">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min={1}
                      max={120}
                      placeholder="Enter your age"
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    />
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Marital Status</label>
                    <select
                      name="marital_status"
                      value={formData.marital_status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-primary">Location</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    >
                      <option value="">Select State</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="delhi">Delhi</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="west-bengal">West Bengal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Area Type</label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    >
                      <option value="">Select Area</option>
                      <option value="urban">Urban</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Information Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <UsersIcon className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-primary">Category Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-input bg-secondary/20 text-primary focus:outline-none focus:border-ring transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-primary">Additional Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* PWD */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Person with Disability?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pwd"
                          value="yes"
                          checked={formData.pwd === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pwd"
                          value="no"
                          checked={formData.pwd === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Minority */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Minority Community?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="minority"
                          value="yes"
                          checked={formData.minority === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="minority"
                          value="no"
                          checked={formData.minority === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Student */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Currently a Student?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="student"
                          value="yes"
                          checked={formData.student === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="student"
                          value="no"
                          checked={formData.student === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">No</span>
                      </label>
                    </div>
                  </div>

                  {/* BPL */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Below Poverty Line (BPL)?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bpl"
                          value="yes"
                          checked={formData.bpl === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bpl"
                          value="no"
                          checked={formData.bpl === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-primary">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Continue to Schemes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
