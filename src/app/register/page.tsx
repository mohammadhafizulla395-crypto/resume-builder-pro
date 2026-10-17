import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--rb-bg)] px-6 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-bold">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm">
          RF
        </span>
        ResumeForge
      </Link>
      <Suspense fallback={<div className="h-96 w-full max-w-md" />}>
        <AuthForm mode="register" />
      </Suspense>
    </main>
  );
}
