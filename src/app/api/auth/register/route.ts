import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const registerSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export async function POST(req: Request) {
  const limited = rateLimit(clientKey(req, "register"), 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  // Anti-enumeration: every valid registration returns the SAME status, body,
  // and amount of bcrypt work — whether or not the email already exists — so
  // this endpoint cannot be used as an account-existence oracle. Users with an
  // existing account simply sign in with their original password.
  const created = "Account created. You can sign in now.";

  try {
    await connectDB();
    const existing = await User.findOne({ email: normalizedEmail }).select("_id").lean();
    if (existing) {
      await bcrypt.hash(password, 12); // equalize timing with the create path
      return NextResponse.json({ message: created }, { status: 201 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({ name, email: normalizedEmail, passwordHash });

    return NextResponse.json({ message: created }, { status: 201 });
  } catch (err) {
    // Duplicate key race (unique index) — same uniform response
    if (typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000) {
      return NextResponse.json({ message: created }, { status: 201 });
    }
    console.error("[register]", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
