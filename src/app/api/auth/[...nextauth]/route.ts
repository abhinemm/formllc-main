import UserService from "@/services/user.model.service";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { validatePassword } from "@/utils/helper";
import { NextResponse } from "next/server";
import { NextApiHandler } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        console.log("inside the confition");

        const { email, password } = credentials!;
        // Find the user in your database
        const user = await UserService.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Verify the password
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return the user object to include it in the session
        return {
          id: user.id,
          email: user.email,
          fistName: user.firstName,
          lastName: user.lastName,
          type: user.type
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional custom sign-in page
  },
  callbacks: {
    async signIn(data: any): Promise<any> {
      console.log("accountaccount", data);

      const { user, account, profile } = data;
      // For Google Sign-In
      if (account?.provider === "google") {
        console.log("accountaccountaccountaccount");

        const userExist = await UserService.findOne({ email: user.email });
        console.log("userExist", userExist);

        if (userExist) {
          return true; // Allow sign-in for existing users
        }
        // Create a new user if not already in the database
        await UserService.createUser({
          email: user.email,
          gid: user.id,
          profilePic:user.image,
          firstName: user.name,
          // profilePic: d,
        });
        return true; // Continue with sign-in
      }
      return true; // For credentials login, simply allow sign-in
    },
    async jwt(data: any): Promise<any> {
      const { token, account, user } = data;
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(data: any): Promise<any> {
      console.log("session data", data);

      const { session, token } = data;
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      const userExist = await UserService.findOne({
        email: session.user.email,
      });
      if (userExist) {
        session.user.id = userExist.id;
        session.user = userExist.dataValues;
        delete session.user.password;
      }
      return session;
    },
  },
};

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
