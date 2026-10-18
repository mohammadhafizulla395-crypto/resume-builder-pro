import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

// Module scope: stable across prerender (cacheComponents bans new Date() in render).
const YEAR = new Date().getFullYear();

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--rb-bg)] px-6 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-bold">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm">
          RF
        </span>
        ResumeForge
      </Link>
      <Suspense fallback={<div className="h-96 w-full max-w-md" />}>
        <AuthForm mode="login" />
      </Suspense>
      <footer className="mt-8 text-center text-xs leading-relaxed text-slate-400">
        © {YEAR} ResumeForge · Built by{" "}
        <span className="font-medium text-slate-600">Shaik Mohammed Hafizulla</span> ·{" "}
        <Link href="/privacy" className="hover:text-slate-600 underline-offset-2 hover:underline">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="hover:text-slate-600 underline-offset-2 hover:underline">
          Terms
        </Link>
      </footer>
    </main>
  );
}
