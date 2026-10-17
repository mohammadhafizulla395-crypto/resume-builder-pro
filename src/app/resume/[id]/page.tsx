import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Types } from "mongoose";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { TEMPLATE_IDS, type TemplateId } from "@/types/resume";

export const metadata: Metadata = { title: "Edit resume" };

// Blocking route: waits for the session/DB check before responding (Next 16 cacheComponents)
export const instant = false;

export default async function EditResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) notFound();

  await connectDB();
  const doc = await Resume.findOne({ _id: id, userId }).lean();
  if (!doc) notFound();

  const template = (TEMPLATE_IDS as readonly string[]).includes(doc.template)
    ? (doc.template as TemplateId)
    : "ats-minimal";

  return (
    <ResumeEditor
      mode="edit"
      initialId={doc._id.toString()}
      initialTitle={doc.title}
      initialTemplate={template}
      initialData={JSON.parse(JSON.stringify(doc.data))}
      userName={session?.user?.name ?? ""}
    />
  );
}
