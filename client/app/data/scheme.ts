export const eligibleSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    description:
      "Skill development scheme that provides training to youth in industry-relevant skills, enabling them to secure better livelihoods.",
    documents: [
      { name: "Aadhaar Card", howToProcure: "Visit nearest Aadhaar center or download from UIDAI website" },
      { name: "Bank Account Details", howToProcure: "Open account at any bank branch with KYC documents" },
      { name: "Educational Certificates", howToProcure: "Contact your school/college for copies" },
    ],
  },
  {
    id: 2,
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    description:
      "Provides loans up to ₹10 lakh to small businesses and entrepreneurs to help them grow and create jobs.",
    documents: [
      { name: "Business Plan", howToProcure: "Prepare detailed plan showing business model and projections" },
      { name: "Identity Proof", howToProcure: "Aadhaar, PAN, or Voter ID from respective authorities" },
      { name: "Address Proof", howToProcure: "Utility bills, rent agreement, or Aadhaar" },
      { name: "Bank Statement", howToProcure: "Request from your bank (last 6 months)" },
    ],
  },
  {
    id: 3,
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    description: "Life insurance scheme offering coverage of ₹2 lakh at an affordable premium of ₹436 per year.",
    documents: [
      { name: "Aadhaar Card", howToProcure: "Visit nearest Aadhaar center or download from UIDAI website" },
      { name: "Savings Bank Account", howToProcure: "Open at any participating bank" },
      { name: "Consent Form", howToProcure: "Available at bank branch or download online" },
    ],
  },
  {
    id: 4,
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    description:
      "Accident insurance scheme providing coverage of ₹2 lakh for accidental death or disability at ₹20 per year.",
    documents: [
      { name: "Aadhaar Card", howToProcure: "Visit nearest Aadhaar center or download from UIDAI website" },
      { name: "Bank Account", howToProcure: "Savings account at participating bank" },
      { name: "Application Form", howToProcure: "Download from bank website or collect from branch" },
    ],
  },
];

export const timelineSteps = [
  {
    step: 1,
    title: "Review Eligible Schemes",
    description: "Go through all schemes and select ones you want to apply for",
    duration: "1 day",
    status: "current",
  },
  {
    step: 2,
    title: "Gather Documents",
    description: "Collect all required documents as per scheme requirements",
    duration: "1-2 weeks",
    status: "pending",
  },
  {
    step: 3,
    title: "Submit Applications",
    description: "Fill application forms and submit with documents",
    duration: "2-3 days",
    status: "pending",
  },
  {
    step: 4,
    title: "Verification Process",
    description: "Wait for authorities to verify your application and documents",
    duration: "2-4 weeks",
    status: "pending",
  },
  {
    step: 5,
    title: "Receive Benefits",
    description: "Get enrolled in schemes and start receiving benefits",
    duration: "Ongoing",
    status: "pending",
  },
];