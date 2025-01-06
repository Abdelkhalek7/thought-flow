"use client";

import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/Loading";
import { NonLoggedInContent } from "@/components/NonLoggedInContent";
import { LoggedInContent } from "@/components/LoggedInContent";

export default function HomePageView() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        {status == "authenticated" ? (
          <LoggedInContent userID={session.user.id} />
        ) : (
          <NonLoggedInContent />
        )}
      </main>
    </div>
  );
}
