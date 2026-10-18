import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { createResumeSchema } from "@/types/resume";
import { rateLimit, clientKey } from "@/lib/rate-limit";

async function requireUserId(): Promise<{ userId: string } | { error: NextResponse }> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { userId };
}

/** GET /api/resumes — list current user's resumes */
export async function GET() {
  const authz = await requireUserId();
  if ("error" in authz) return authz.error;

  await connectDB();
  const docs = await Resume.find({ userId: authz.userId })
    .sort({ updatedAt: -1 })
    .select("title template createdAt updatedAt")
    .lean();

  return NextResponse.json({
    resumes: docs.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      template: d.template,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    })),
  });
}

/** POST /api/resumes — create a resume */
export async function POST(req: Request) {
  const authz = await requireUserId();
  if ("error" in authz) return authz.error;

  const limited = rateLimit(clientKey(req, "create-resume"), 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Slow down." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = createResumeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid resume data." },
      { status: 400 },
    );
  }

  await connectDB();

  // Per-user cap: prevents a single account from unbounded DB/document
  // growth (resource-abuse vector). Generous for real humans.
  const RESUME_CAP = 50;
  const count = await Resume.countDocuments({ userId: authz.userId });
  if (count >= RESUME_CAP) {
    return NextResponse.json(
      { error: `You've reached the limit of ${RESUME_CAP} resumes. Delete or duplicate an existing one instead.` },
      { status: 429 },
    );
  }

  const doc = await Resume.create({
    userId: authz.userId,
    title: parsed.data.title,
    template: parsed.data.template,
    data: parsed.data.data,
  });

  return NextResponse.json(
    { id: doc._id.toString(), title: doc.title, template: doc.template },
    { status: 201 },
  );
}
