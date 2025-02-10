import User from "../../../../models/User";
import { NextResponse } from "next/server";

// User Delete By Id 
export async function DELETE(request, { params }) {
    const { userId } = params;

    // Check if userId is provided
    if (!userId) {
        return NextResponse.json({
            message: "User ID is required.",
            success: false
        }, { status: 400 });
    }

    try {
        // Check if the user exists before attempting to delete
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not found.",
                success: false
            }, { status: 404 });
        }

        // Delete the user from the database
        await User.deleteOne({ _id: userId });

        return NextResponse.json({
            message: "User deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error in deleting user.",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
// End

// Gate User Data By Id
export async function GET(request, { params }) {
    const { userId } = params;

    try {
        // Fetch the user data from the database
        const user = await User.findById({ _id: userId });

        if (!user) {
            return NextResponse.json({
                message: "User not found.",
                success: false
            });
        }

        // Return the user data on success
        return NextResponse.json({
            message: "Get User Data Successfully.",
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({
            message: "Error to fetch user data.",
            success: false,
            error: error.message // Include the error message for debugging
        });
    }
}
// End

// Update User Data By Id
export async function PUT(request, { params }) {
    const { userId } = params;
    const { fullname, email } = await request.json();

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                message: "User not found.",
                success: false,
            });
        }

        // Update the user fields with the provided data
        user.fullname = fullname;
        user.email = email;
        // user.password = password;

        // Save the updated user data
        const updatedUser = await user.save();

        // Return the updated user data
        return NextResponse.json({
            message: "User data updated successfully.",
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to update data.",
            success: false,
            error: error.message,
        });
    }
}
// End