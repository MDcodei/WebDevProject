import connectMongoDB from "../../libs/mongodb";
import User from "../../models/models";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    await connectMongoDB();
    await User.create({ email, password });
    return NextResponse.json({ message: "Item added successfuly"}, {status: 201})
}

export async function GET() {
    await connectMongoDB();
    const items = await User.find();
    return NextResponse.json({items});
}