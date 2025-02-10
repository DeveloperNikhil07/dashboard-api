import connectToMongo from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";
connectToMongo();

// Get Login User Api
export async function GET(request) {
    let users = [];
    try {
        users = await User.find().select("-password");
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get user data",
            success: false
        });
    }
    return NextResponse.json(users);
}