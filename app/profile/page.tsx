import { Suspense } from "react";
import ProfilePageContent from "./ProfilePageContent";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white text-black">
          <p className="text-sm text-gray-500">Loading profile...</p>
        </main>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
