// client/lib/profile.ts
export type Profile = {
  gender?: string;
  age?: number | null;
  marital_status?: string;
  state?: string;
  area?: string;
  category?: string;
  pwd?: string;
  minority?: string;
  student?: string;
  bpl?: string;
};

export function isProfileComplete(profile?: Profile | null) {
  if (!profile) return false;

  // define required fields for eligibility
  const required = ["gender", "age", "state", "area", "category"];

  for (const key of required) {
    const value = (profile as any)[key];
    if (value === undefined || value === null || value === "") return false;
    // special-case age
    if (key === "age" && (typeof value !== "number" || value <= 0)) return false;
  }

  return true;
}
