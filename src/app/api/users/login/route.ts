import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/models";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const bcrypt = require('bcryptjs');

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    await connectMongoDB();
}