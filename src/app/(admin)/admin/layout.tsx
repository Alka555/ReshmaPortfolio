import React from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-midnight text-foreground flex">
      {/* Sidebar hidden on login page via route conditional inside child pages or standard layout */}
      <AdminSidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
