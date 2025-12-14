import mongoose, { Schema, model, models } from "mongoose";

const TimelineStepSchema = new Schema({
    step_order: { type: Number, required: true },
    action: { type: String, required: true },
    description: { type: String },
    estimated_duration: { type: String }
});

const TimelineSchema = new Schema({
    clerkUserId: { type: String, required: true },
    executionId: { type: String, required: true },
    timeline_steps: [TimelineStepSchema],
}, { timestamps: true });

export const Timeline = models.Timeline || model("Timeline", TimelineSchema);
