import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/models";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const bcrypt = require('bcryptjs');

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        email,
        password: hashedPassword,
    }
    try {
        await User.create({ email, password });
    } catch (err: any) {
        throw err;
    }
}