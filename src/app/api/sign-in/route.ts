import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse the incoming request body
        const { email, password } = await req.json();

        // Log the received data (remove this in production for security)
        console.log("Email:", email);
        console.log("Password:", password);


        return NextResponse.json({ message: "Sign-in successful" }, { status: 200 });


    } catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { message: "An error occurred while signing in." },
            { status: 500 }
        );
    }
}
