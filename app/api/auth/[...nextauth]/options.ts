import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { db } from "@/types/db";
import bcrypt from "bcryptjs";

// SETUP AUTH PROVIDERS
// https://next-auth.js.org/configuration/providers/oauth
const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile) {
        // console.log("Profile GitHub", profile);
        let userRole = "USER";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "USER";
        if (profile?.email == "luke@thirty3digital.co.uk") {
          userRole = "ADMIN";
        }

        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Provider setup for custom user login
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      // The below credentials setups the login form with specific fields.
      // FOr the example belwo it creates a form with username and password fields.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        // Check the DB for existing user data
        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null;
        }

        // Use bcrypt compare the saved hashed user password with the password
        // they have just entered.
        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (match) {
          return user;
        }

        return null;
      },
    }),
  ],
  // ADD CALLBACKS
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
  },
};

export default options;
