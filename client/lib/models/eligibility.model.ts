import mongoose, { Schema, model, models } from "mongoose";

const SchemeDetailSchema = new Schema({
    scheme_name: { type: String, required: true },
    description: { type: String },
    benefits: { type: String }
});

const EligibilitySchema = new Schema({
    clerkUserId: { type: String, required: true },
    executionId: { type: String, required: true },
    schemes: [SchemeDetailSchema],
    // Optional: Link to a user if available in the future
    // userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Eligibility = models.Eligibility || model("Eligibility", EligibilitySchema);
