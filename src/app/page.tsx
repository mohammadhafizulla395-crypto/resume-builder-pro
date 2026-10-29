import { auth } from "@/lib/auth";
import { LandingPageClient } from "./LandingPageClient";

// Dynamic route: the header reflects the live session (auth() reads cookies).

export default async function LandingPage() {
  const session = await auth();
  const signedIn = Boolean(session?.user);

  return <LandingPageClient signedIn={signedIn} />;
}