"use client"; // To make sure this runs on the client-side

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, useClerk } from "@clerk/clerk-react"; // Clerk session and clerk hooks

export default function Page() {
  const { session } = useSession();  // Get Clerk session
  const { signOut } = useClerk();  // Clerk's signOut function
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // If user is logged in, sign them out and redirect to sign-in page
      signOut(); // Invalidate session
      router.push("/sign-in"); // Redirect to sign-in page
    } else {
      // If no session, redirect to sign-in page
      router.push("/sign-in");
    }
  }, [session, router, signOut]); // Re-run this effect when session, router, or signOut changes

  return <div></div>;
}
