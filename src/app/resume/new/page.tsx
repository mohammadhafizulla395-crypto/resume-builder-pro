import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { emptyResumeData } from "@/types/resume";

export const metadata: Metadata = { title: "New resume" };

// Blocking route: waits for the session/DB check before responding (Next 16 cacheComponents)
export const instant = false;

export default async function NewResumePage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const suggestedName = session?.user?.name ?? "";

  return (
    <ResumeEditor
      mode="create"
      initialId={null}
      initialTitle="Untitled resume"
      initialTemplate="ats-minimal"
      initialData={emptyResumeData(suggestedName)}
      userName={suggestedName}
    />
  );
}
