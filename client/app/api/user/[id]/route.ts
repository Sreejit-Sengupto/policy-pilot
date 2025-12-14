import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        const userDoc = await User.findById(id);
        if (!userDoc) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Optional: Ensure the user can only fetch their own data
        // if (user.clerkUserId !== userId) {
        //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        // }

        return NextResponse.json({ success: true, data: userDoc }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching user:", error);
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        const userDoc = await User.findByIdAndDelete(id);
        if (!userDoc) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting user:", error);
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

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const userDoc = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!userDoc) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                data: userDoc,
                message: "User updated successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating user:", error);
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
