"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login"; // Redirect to login if not logged in
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">Welcome, {user?.email}</h2>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
