import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        try {
          const response = await Axios.post(
            "/api/users/login/google",
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log("Responses:",response);
          const user = response.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXT_PUBLIC_SECRET,
  callback: {
    async jwt({ token, user }) {
      console.log("token from next auth:",token)
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  
};

const handler = NextAuth(authOptions);

console.log("thisi is auth options", handler);
export { handler as GET, handler as POST };
