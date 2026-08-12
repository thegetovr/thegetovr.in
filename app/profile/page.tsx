"use client";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Overview from "@/components/profile/Overview";
import MyOrders from "@/components/profile/MyOrders";
import Addresses from "@/components/profile/Address";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Wishlist from "@/components/profile/Wishlist";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const result = await response.json();

        if (result.success) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session Check Error:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setUser(null);

        sessionStorage.setItem(
          "auth_notification",
          result.message || "Logout Successful",
        );

        router.push("/");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen bg-white text-black">
      <aside className="w-70 shrink-0 border-r border-gray-200 bg-white">
        <ProfileSidebar
          user={user}
          onLogout={handleLogout}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </aside>

      <section className="flex-1 p-8">
        {activeSection === "overview" && <Overview user={user} />}
        {activeSection === "orders" && <MyOrders user={user} />}
        {activeSection === "addresses" && <Addresses />}
        {activeSection === "profile" && <ProfileDetails user={user} />}
        {activeSection === "wishlist" && <Wishlist />}
      </section>
    </main>
  );
}
