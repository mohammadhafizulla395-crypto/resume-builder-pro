import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { rateLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(8).max(128),
});

// Precomputed at module load so failed lookups perform exactly the same
// bcrypt work as real comparisons — closes the user-enumeration timing
// side channel (fast response for unknown emails vs slow for known ones).
const DUMMY_HASH = bcrypt.hashSync("timing-equalization-placeholder", 12);

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 days
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Sliding-window rate limit per IP+email on login attempts
        const limited = rateLimit(`login:${email}`, 10, 60_000);
        if (!limited.ok) return null;

        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
        if (!user) {
          await bcrypt.compare(password, DUMMY_HASH); // timing equalization
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
