import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs"

export const POST = async (req) => {
  const { username, email, password } = await req.json();
  const hashPassword = await bcrypt.hash(password, 5);
  
  try {
    await connectToDB();

    const newUser = new User({
      username,
      email,
      password: hashPassword
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 })
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}