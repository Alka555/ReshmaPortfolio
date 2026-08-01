"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => Promise<void>;
  className?: string;
}

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      setStatus("submitting");
      setErrorMessage("");
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default simulated submit
        await new Promise((res) => setTimeout(res, 1000));
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border-t border-white/20 bg-navy/25 p-6 md:p-10 space-y-8 max-w-xl mx-auto",
        className
      )}
    >
      <div className="space-y-2">
        <h3 className="font-heading text-2xl font-bold text-white">
          Send a Message
        </h3>
        <p className="text-sm text-muted-foreground">
          Interested in starting a project or discussing a narrative script?
        </p>
      </div>

      {status === "success" && (
        <div className="flex items-center space-x-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Thanks! I&apos;ll get back to you soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center space-x-3 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-semibold text-white uppercase tracking-wider">
            Your Name <span className="text-gold">*</span>
          </label>
          <Input
            id="name"
            type="text"
            required
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold text-white uppercase tracking-wider">
            Email Address <span className="text-gold">*</span>
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-semibold text-white uppercase tracking-wider">
            Message / Project Overview <span className="text-gold">*</span>
          </label>
          <Textarea
            id="message"
            required
            rows={5}
            placeholder="Tell me about your project, timeline, and vision..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full gap-2"
      >
        <Send className="h-4 w-4" />
        <span>{status === "submitting" ? "Sending..." : "Submit Message"}</span>
      </Button>
    </form>
  );
}
