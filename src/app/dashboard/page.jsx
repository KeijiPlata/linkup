"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login"); 
      } else {
        setUser(user);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        router.push("/dashboard"); 
      }
    });

    return () => authListener.subscription.unsubscribe(); 
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">
        Welcome, {user?.email || "User"}
      </h2>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
