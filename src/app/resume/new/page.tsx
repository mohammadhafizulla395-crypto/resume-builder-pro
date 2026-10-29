import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { emptyResumeData, templateIdSchema } from "@/types/resume";

export const metadata: Metadata = { title: "New resume" };

// Dynamic route: waits for the session/DB check before responding.

export default async function NewResumePage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  // Preselected template from "Use this template" links (validated against the registry)
  const sp = await searchParams;
  const rawTemplate = Array.isArray(sp.template) ? sp.template[0] : sp.template;
  const parsed = rawTemplate ? templateIdSchema.safeParse(rawTemplate) : null;
  const initialTemplate = parsed?.success ? parsed.data : "ats-minimal";

  const suggestedName = session?.user?.name ?? "";

  return (
    <ResumeEditor
      mode="create"
      initialId={null}
      initialTitle="Untitled resume"
      initialTemplate={initialTemplate}
      initialData={emptyResumeData(suggestedName)}
      userName={suggestedName}
    />
  );
}
