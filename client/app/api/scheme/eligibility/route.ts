import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Eligibility } from "@/lib/models/eligibility.model";
import { parseKestraOutput } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        console.log("Received Eligibility Data:");
        const body = await req.json();
        const { clerkUserId, executionId, data } = body;
        const eligibilityData = parseKestraOutput(data);
        console.log(JSON.stringify(eligibilityData, null, 2));

        await connectDB();

        const newEligibility = new Eligibility({
            clerkUserId,
            executionId,
            ...eligibilityData,
        });
        await newEligibility.save();
        console.log("Eligibility data saved to DB");

        return NextResponse.json(
            { message: "Eligibility data received and saved" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error logging eligibility data:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
