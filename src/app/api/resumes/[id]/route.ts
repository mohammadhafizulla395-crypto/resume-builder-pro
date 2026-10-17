import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { updateResumeSchema } from "@/types/resume";
import { rateLimit, clientKey } from "@/lib/rate-limit";

type Params = { params: Promise<{ id: string }> };

async function findOwned(id: string) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  if (!Types.ObjectId.isValid(id)) {
    return { error: NextResponse.json({ error: "Invalid resume id." }, { status: 400 }) };
  }
  await connectDB();
  const doc = await Resume.findOne({ _id: id, userId }).lean();
  if (!doc) return { error: NextResponse.json({ error: "Resume not found." }, { status: 404 }) };
  return { doc, userId };
}

function serialize(doc: {
  _id: Types.ObjectId;
  title: string;
  template: string;
  data: unknown;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    template: doc.template,
    data: doc.data,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/** GET /api/resumes/[id] — full resume for owner */
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const found = await findOwned(id);
  if ("error" in found) return found.error;
  return NextResponse.json(serialize(found.doc!));
}

/** PUT /api/resumes/[id] — update title/template/data (autosave) */
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;

  const limited = rateLimit(clientKey(req, "save-resume"), 120, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many saves per minute." }, { status: 429 });
  }

  const found = await findOwned(id);
  if ("error" in found) return found.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = updateResumeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid resume data." },
      { status: 400 },
    );
  }

  const update: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) update.title = parsed.data.title;
  if (parsed.data.template !== undefined) update.template = parsed.data.template;
  if (parsed.data.data !== undefined) update.data = parsed.data.data;

  const doc = await Resume.findOneAndUpdate(
    { _id: id, userId: found.userId },
    { $set: update },
    { new: true, runValidators: true },
  ).lean();

  if (!doc) return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  return NextResponse.json(serialize(doc));
}

/** DELETE /api/resumes/[id] */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const found = await findOwned(id);
  if ("error" in found) return found.error;
  await Resume.deleteOne({ _id: id, userId: found.userId });
  return NextResponse.json({ ok: true });
}

/** POST /api/resumes/[id] — duplicate */
export async function POST(req: Request, { params }: Params) {
  const { id } = await params;
  const limited = rateLimit(clientKey(req, "duplicate-resume"), 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const found = await findOwned(id);
  if ("error" in found) return found.error;

  const copy = await Resume.create({
    userId: found.userId,
    title: `${found.doc!.title} (copy)`.slice(0, 160),
    template: found.doc!.template,
    data: found.doc!.data,
  });

  return NextResponse.json({ id: copy._id.toString(), title: copy.title }, { status: 201 });
}
