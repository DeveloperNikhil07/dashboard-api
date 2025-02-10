import ConnectDataBase from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// User signUp Post API
ConnectDataBase();

export async function POST(request) {
  try {
    const { fullname, email, password } = await request.json();

    // Validate required fields
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));

    // Create user object
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const createdUser = await user.save();

    // Send success response
    return NextResponse.json(
      {
        message: "User created successfully",
        user: createdUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    // Send error response
    return NextResponse.json(
      {
        message: "Failed to create user!",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
