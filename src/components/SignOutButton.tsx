"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg px-3 py-2 font-medium text-slate-600 hover:text-slate-900"
    >
      Sign out
    </button>
  );
}
