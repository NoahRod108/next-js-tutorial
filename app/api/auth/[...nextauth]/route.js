import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

connectToDB();

const getRandomInt = (num) => {
    return Math.floor(Math.random() * num)
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile }){
            try {    
                // Check if user exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                const userNameExists = await User.findOne({
                    username: profile.name.replace(/\s/g, "").toLowerCase()
                });
                
                // If user does not exist create new user
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: userNameExists ? profile.name.replace(/\s/g, "").toLowerCase() + getRandomInt(5) : profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
                        followers: [],
                        following: []
                    });
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };