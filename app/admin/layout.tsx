
import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}