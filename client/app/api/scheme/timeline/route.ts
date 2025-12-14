import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Timeline } from "@/lib/models/timeline.model";
import { parseKestraOutput } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        console.log("Received Timeline Data:");
        const body = await req.json();
        const { clerkUserId, executionId, data } = body;
        const timelineData = parseKestraOutput(data);
        console.log(JSON.stringify(timelineData, null, 2));

        await connectDB();

        const newTimeline = new Timeline({
            clerkUserId,
            executionId,
            ...timelineData,
        });
        await newTimeline.save();
        console.log("Timeline data saved to DB");

        return NextResponse.json(
            { message: "Timeline data received and saved" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error logging timeline data:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
