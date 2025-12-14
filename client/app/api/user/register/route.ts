import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const {
            name,
            email,
            phone,
            age,
            gender,
            state,
            district,
            occupationCategory,
            annualIncome,
            educationLevel,
        } = body;

        // Basic validation
        if (
            !name ||
            !email ||
            !age ||
            !state ||
            !occupationCategory ||
            !annualIncome
        ) {
            return NextResponse.json(
                { success: false, message: "Please fill all required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 400 }
            );
        }

        const newUser = await User.create({
            name,
            email,
            phone,
            age,
            gender,
            state,
            district,
            occupationCategory,
            annualIncome,
            educationLevel,
            clerkUserId: userId, // Use the authenticated Clerk User ID
        });

        return NextResponse.json(
            {
                success: true,
                data: newUser,
                message: "User registered successfully",
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
