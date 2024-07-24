import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// SETUP AUTH PROVIDERS
// https://next-auth.js.org/configuration/providers/oauth
const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub", profile);
        let userRole = "GitHub User";

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
        console.log("Profile Google", profile);
        let userRole = "Google User";
        if (profile?.email == "luke@thirty3digital.co.uk") {
          userRole = "Admin";
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
