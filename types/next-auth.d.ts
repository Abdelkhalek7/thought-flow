// types/next-auth.d.ts or directly in the root folder
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
      bio?: string | null; // Add your custom field here
      numQuotesCreated?: number | null;
      numFavorites?: number | null;
      createdAt?: Date | null;
    };
  }
}
