import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse the request body and extract the data
        const { firstname, lastname, email, password } = await req.json();

        await connectMongoDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({firstname, lastname, email, password: hashedPassword});
        // Log the extracted data for debugging purposes
        console.log("Firstname: ", firstname,);
        console.log("Lastname: ", lastname);
        console.log("Email: ", email);
        console.log("Password: ", password);

        // Respond with a success message
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);

        // Respond with an error message and a 500 status code
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
            
        );
    }
}

