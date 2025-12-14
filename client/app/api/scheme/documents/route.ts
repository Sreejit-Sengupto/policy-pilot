import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Document } from "@/lib/models/document.model";
import { parseKestraOutput } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        console.log("Received Documents Data:");
        const body = await req.json();
        const { clerkUserId, executionId, data } = body;
        const documentsData = parseKestraOutput(data);
        console.log(JSON.stringify(documentsData, null, 2));

        await connectDB();

        const newDocument = new Document({
            clerkUserId,
            executionId,
            ...documentsData,
        });
        await newDocument.save();
        console.log("Documents data saved to DB");

        return NextResponse.json(
            { message: "Documents data received and saved" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error logging documents data:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
