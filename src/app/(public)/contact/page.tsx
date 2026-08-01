import { SectionHeader } from "@/components/common/section-header";
import { ContactForm } from "@/components/common/contact-form";
import { createMessageAction } from "@/actions/messages.actions";
import { FadeIn } from "@/components/motion/fade-in";
import { Mail, Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import React from "react";

export default function ContactPage() {
  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <div className="container px-6 py-32 max-w-7xl md:px-12 md:py-40">
      <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-6 lg:sticky lg:top-28">
          <FadeIn>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_60px_-30px_rgba(7,22,44,0.85)] md:p-9">
              <SectionHeader
                badgeTag="Get In Touch"
                title="Let's create something worth watching."
                subtitle="Reach out to discuss commercial films, brand content, or creative writing commissions."
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/40 p-4">
                  <div className="shrink-0 rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Email</h3>
                    <a href="mailto:hello@reshmam.com" className="text-sm text-white/60 transition-colors hover:text-gold">
                      hello@reshmam.com
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={`tel:${phoneNumber}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/40 p-4 text-left transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]">
                    <div className="shrink-0 rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Call</h3>
                      <p className="text-sm text-white/60">{phoneNumber}</p>
                    </div>
                  </a>

                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/40 p-4 text-left transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]">
                    <div className="shrink-0 rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">WhatsApp</h3>
                      <p className="text-sm text-white/60">Quick voice or text reply</p>
                    </div>
                  </a>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/40 p-4">
                  <div className="shrink-0 rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Response Time</h3>
                    <p className="text-sm text-white/60">Within 48 hours on business days.</p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-midnight/40 p-4">
                  <div className="shrink-0 rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Base of Operation</h3>
                    <p className="text-sm text-white/60">India — available for remote & on-location projects worldwide.</p>
                  </div>
                </div> */}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/65 shadow-[0_20px_60px_-30px_rgba(7,22,44,0.85)]">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Currently Accepting</p>
              <ul className="space-y-2 pl-5 text-sm text-white/70">
                <li>Commercial ad film directing</li>
                <li>Brand story and product videos</li>
                <li>Instagram reel production</li>
                <li>Screenplay and script commissions</li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.1}>
            <ContactForm onSubmit={async (data) => { "use server"; await createMessageAction(data); }} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
