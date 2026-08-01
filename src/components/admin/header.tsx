"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-slate bg-navy/40 px-8 py-5 backdrop-blur-md sticky top-0 z-30",
        className
      )}
    >
      <div>
        <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-muted-foreground hover:text-white rounded-lg hover:bg-slate/40 transition-colors"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 border-l border-slate/40 pl-4">
          <div className="h-8 w-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-xs border border-gold/40">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight">
              {siteConfig.owner}
            </p>
            <p className="text-[10px] text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
