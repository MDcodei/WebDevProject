import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user"; // Adjust the path to your User model

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse the incoming request body
        const { email, password } = await req.json();

        // Ensure email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found. Please register first." },
                { status: 404 }
            );
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Incorrect password. Please try again." },
                { status: 401 }
            );
        }

        // If everything is valid, return a success response
        return NextResponse.json(
            { message: "Sign-in successful", user: { id: user._id, email: user.email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { message: "An error occurred while signing in." },
            { status: 500 }
        );
    }
}
