// import { connectMongoDB } from "@/app/lib/mongodb";
// import User from "@/app/models/user";
// import { NextResponse, NextRequest } from "next/server";

// export async function POST(req) {
//     try{
//         await connectMongoDB();
//         const { email } = await req.json();
//         const user = await User.findOne({ email }).select("_id");
//         console. log("user: ", user);
//         return NextResponse. json({ user });
//     } catch (error) {
// console. log(error);
//     }
// }

import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        // Parse the JSON request body
        const { email } = await req.json();

        // Find the user by email and select only the `_id` field
        const user = await User.findOne({ email }).select("_id");
        console.log("user: ", user);

        // Respond with the user object
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error:", error);

        // Respond with a 500 status and error message
        return NextResponse.json(
            { message: "An error occurred while processing the request." },
            { status: 500 }
        );
    }
}

