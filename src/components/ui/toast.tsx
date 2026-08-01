"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  duration?: number;
  className?: string;
}

export function Toast({
  message,
  type = "info",
  onClose,
  duration = 4000,
  className,
}: ToastProps) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />,
    info: <Info className="h-5 w-5 text-gold shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/40 bg-midnight/90 text-white",
    error: "border-red-500/40 bg-midnight/90 text-white",
    info: "border-gold/40 bg-midnight/90 text-white",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center space-x-3 rounded-xl border p-4 shadow-soft-lg backdrop-blur-md max-w-md animate-fade-in",
        borders[type],
        className
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium pr-2">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss toast notification"
          className="text-muted-foreground hover:text-white ml-auto"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
