import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Eligibility } from "@/lib/models/eligibility.model";
import { Document } from "@/lib/models/document.model";
import { Timeline } from "@/lib/models/timeline.model";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ clerkUserId: string }> }
) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { clerkUserId } = await params;

        // Optional: Verify that the authenticated user matches the request
        if (userId !== clerkUserId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const scheme_name = searchParams.get("scheme_name");

        console.log(`Fetching scheme details for user: ${clerkUserId} `);

        let eligibilityEntry;

        if (scheme_name) {
            // Find the latest eligibility entry that contains the requested scheme
            eligibilityEntry = await Eligibility.findOne({
                clerkUserId,
                "schemes.scheme_name": { $regex: scheme_name, $options: "i" },
            }).sort({ createdAt: -1 });
        } else {
            // Find the latest eligibility entry
            eligibilityEntry = await Eligibility.findOne({ clerkUserId }).sort({
                createdAt: -1,
            });
        }

        if (!eligibilityEntry) {
            return NextResponse.json(
                { message: "No eligibility data found for this user" },
                { status: 404 }
            );
        }

        const executionId = eligibilityEntry.executionId;
        console.log(`Found eligibility entry with executionId: ${executionId} `);

        // Fetch corresponding documents and timeline using executionId
        const documentEntry = await Document.findOne({ executionId });
        const timelineEntry = await Timeline.findOne({ executionId });

        // Merge schemes from Eligibility and Document models
        let schemes = eligibilityEntry.schemes.map((scheme: any) => {
            const docScheme = documentEntry
                ? documentEntry.schemes.find(
                    (s: any) => s.scheme_name === scheme.scheme_name
                )
                : null;
            return {
                ...scheme.toObject(),
                documents: docScheme ? docScheme.documents : [],
            };
        });

        // Filter by scheme_name if provided
        if (scheme_name) {
            schemes = schemes.filter((s: any) =>
                s.scheme_name.toLowerCase().includes(scheme_name.toLowerCase())
            );
        }

        return NextResponse.json(
            {
                clerkUserId,
                executionId,
                schemes,
                timeline: timelineEntry ? timelineEntry.timeline_steps : [],
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching scheme details:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
