import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("🚀 ~ session ~ session:", session);
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      console.log("🚀 ~ session ~ sessionUser:", sessionUser);
      session.user.id = sessionUser._id.toString();
      session.user.image = sessionUser.image;
      session.user.bio = sessionUser.bio;
      session.user.numQuotesCreated = sessionUser.numQuotesCreated;
      session.user.numFavorites = sessionUser.numFavorites;
      session.user.username = sessionUser.username;
      session.user.createdAt = sessionUser.createdAt;

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ account, profile, user, credentials }) {
      try {
        console.log("🚀 ~ signIn ~ profile:", profile);
        await connectToDB();

        // check if user already exists
        if (!profile) {
          throw new Error("Profile is undefined");
        }
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          interface CustomProfile extends GoogleProfile {
            picture: string;
          }

          await User.create({
            email: profile.email,
            username: profile.name
              ? profile.name.replace(" ", "").toLowerCase()
              : "",
            image: (profile as CustomProfile).picture,
          });
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error checking if user exists: ", error.message);
        } else {
          console.log("Error checking if user exists: ", error);
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
