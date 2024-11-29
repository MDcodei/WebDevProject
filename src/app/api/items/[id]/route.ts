import connectMongoDB from "@/app/libs/mongodb";
import mongoose from "mongoose";
import User from "@/app/models/models";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: {id: string};
}

export async function GET(request:NextRequest, {params}: RouteParams) {
    const {id} = params;
    await connectMongoDB();
    const item = await User.findOne({_id: id});
    return NextResponse.json({item}, {status: 200});
}

export async function PUT(request:NextRequest, {params}: RouteParams) {
    const {id} = params;
    const {email: email, password: password} = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {email, password});
    return NextResponse.json({message: "User updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, {params}:RouteParams) {
    const {id} = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message : "Invalid ID format"}, {status: 400});
    }
    await connectMongoDB();
    const deletedItem = await User.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
    return NextResponse.json({message: "User deleted"}, {status: 200});
}