import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs"

connectToDB();

const getRandomInt = (num) => {
    return Math.floor(Math.random() * num)
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
          id: "credentials",
          name: "Credentials",
          async authorize(credentials){
            try {
              const user = await User.findOne({email: credentials.email});

              if(user) {
                // check password
                const isPassCorrect = await bcrypt.compare(credentials.password, user.password);
                
                if(isPassCorrect) {
                  return user
                }else{
                  throw new Error("Wrong email or password!");
                }
              }else {
                console.log(`${user} not found`)
              }              
            } catch (error) {
              console.log(error)
            }
          }
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
                if(profile === undefined) return true;

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
                        username: userNameExists ? profile.name.replace(/\s/g, "").toLowerCase() + getRandomInt(50) : profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
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