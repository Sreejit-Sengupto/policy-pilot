import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },

    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },

    state: { type: String, required: true },
    district: { type: String },

    occupationCategory: {
      type: String,
      enum: ["student", "farmer", "msme", "unemployed", "salaried", "other"],
      required: true,
    },

    annualIncome: { type: Number, required: true },
    educationLevel: { type: String },

    clerkUserId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
