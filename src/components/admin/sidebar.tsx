"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  FileText,
  Trophy,
  Quote,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/dashboard/projects", icon: Film },
  { name: "Writing", href: "/admin/dashboard/writing", icon: FileText },
  { name: "Awards", href: "/admin/dashboard/awards", icon: Trophy },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: Quote },
  { name: "Messages", href: "/admin/dashboard/messages", icon: Mail },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 border-r border-slate bg-navy/80 flex flex-col justify-between p-6 shrink-0 h-screen sticky top-0 backdrop-blur-md",
        className
      )}
    >
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="space-y-1">
          <Link href="/admin/dashboard" className="font-heading text-lg font-bold text-white tracking-wide">
            Project Blueframe
          </Link>
          <p className="text-xs text-gold font-medium">Admin Control Panel</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-gold text-midnight font-semibold shadow-gold-glow"
                    : "text-muted-foreground hover:bg-slate/50 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-6 border-t border-slate/40">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-gold transition-colors duration-200"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View Public Site</span>
        </Link>
        <button
          onClick={() => logoutAction()}
          className="flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 transition-colors duration-200 w-full pt-1"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
