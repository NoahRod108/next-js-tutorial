import { connectToDB } from '@utils/database';
import User from '@models/user';

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if(!user) return new Response("User not found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { username } = await req.json();

    try {
        await connectToDB();

        const existingUser = await User.findById(params.id);

        if(!existingUser) return new Response("User not found", { status: 404 });

        existingUser.username = username;

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        return new Response("Failed to update user", { status: 500 });
    }
}