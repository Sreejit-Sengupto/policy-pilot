import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { clerkUserId, userDetails } = body;

        // Optional: Verify that the authenticated user matches the request
        if (userId !== clerkUserId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        console.log(
            "Triggering Kestra flow with details:",
            userDetails,
            "for user:",
            clerkUserId
        );

        const response = await fetch(
            "http://localhost:8080/api/v1/main/executions/webhook/dev/scheme_eligibility_flow/agent-assemble-secret-key",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_details: JSON.stringify(userDetails),
                    clerkUserId: clerkUserId,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Kestra API error: ${response.status} ${errorText} `);
        }

        const data = await response.json();
        console.log("Kestra flow triggered:", data);
        return NextResponse.json(
            { message: "Flow triggered successfully", executionId: data.id },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error triggering flow:", error);
        return NextResponse.json(
            { message: "Failed to trigger flow", error: error.message },
            { status: 500 }
        );
    }
}
