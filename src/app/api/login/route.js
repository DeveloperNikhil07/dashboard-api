import User from "../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();
  try {

    // 1. Find the user
    const user = await User.findOne({ email: email });
    if (user == null) {
      return NextResponse.json(
        { message: "User not found!" },
        { status: 404 }
      );
    }

    // 2. Check if the password matches
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      return NextResponse.json(
        { message: "Incorrect password!" },
        { status: 401 }
      );
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY,
    );

    // Remove the password field before sending the response
    const { password: _, ...userData } = user.toObject();

    // 4. Create a response and store the token in cookies
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: userData,
      token,
    });

    // Set the token in a cookie
    response.cookies.set("loginAuthToken", token, {
      expiresIn: "1d",
      httpOnly: true, // Cookie accessible only by the server
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Login failed!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
