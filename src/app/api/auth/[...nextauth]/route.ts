import NextAuth, { RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connectToDatabase from "@/db/db";

export const authOptions = {
  secret: "1234",
  providers: [
    GoogleProvider({
      clientId:
        "739070115775-ri4866e0rk7qjks7p80ei6kogfvcpvp3.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string | number | symbol, string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<any> {
        if (
          credentials?.username === "shopwise" &&
          credentials.password === "shopwise"
        ) {
          const user = {
            id: 1,
            name: "Shopwise",
            email: "admin@admin.com",
            image: "",
          };
          return user;
        } else if (
          credentials?.username === "filecompressor" &&
          credentials.password === "filecompressor"
        ) {
          const user = {
            id: 2,
            name: "File Compressor",
            email: "filecompresor@gmail.com",
          };
          return user;
        } else return null;
      },
    }),
  ],
  database: "mongodb+srv://root:root@cluster0.liodvwj.mongodb.net/",
  callbacks: {
    async session(session: any) {
      await connectToDatabase();
      let user = session.session.user;
      if (user) {
        const existingUser = await User.findOne({ email: user.email }).exec();
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            data: [
              { title: "To Do", tasks: [] },
              { title: "In Progress", tasks: [] },
              { title: "Done", tasks: [] },
            ],
          });
        }
        session.user = {
          ...user,
        };
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
