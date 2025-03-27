'use client';

import { useStore } from "../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { currentUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the user-specific dashboard
    router.replace(`/dashboard/${currentUser.id}`);
  }, [currentUser.id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-gray-600 dark:text-gray-400">
        Redirecting to your dashboard...
      </div>
    </div>
  );
}