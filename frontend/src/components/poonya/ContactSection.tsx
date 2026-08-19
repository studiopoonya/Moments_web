import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Instagram, Mail, MapPin, Send } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";
import { TikTokIcon, WhatsAppIcon } from "@/components/poonya/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/api";

const WA_NUMBER = "+62 812-0000-0000"; // placeholder
const IG_HANDLE = "@poonyamoments"; // placeholder
const TIKTOK_LINK = "https://tiktok.com/@poonyamoments"; // placeholder
const EMAIL = "hello@poonyamoments.id"; // placeholder
const ADDRESS = "Jl. Contoh Raya No. 123, Jakarta Selatan"; // placeholder — ganti alamat asli
// Placeholder Jakarta pin — swap the query for the real studio address.
const MAP_SRC = "https://www.google.com/maps?q=Jakarta+Selatan&output=embed";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitLead({ source: "contact_form", ...form });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="kontak" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("contact.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("contact.title")}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{t("contact.subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-border shadow-elegant lg:grid-cols-2">
          {/* Map + location card */}
          <div className="relative min-h-80 bg-muted">
            <iframe
              title="Lokasi Poonya Moments"
              src={MAP_SRC}
              loading="lazy"
              className="absolute inset-0 size-full border-0 grayscale-[15%]"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 max-w-xs rounded-2xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] text-primary uppercase">
                <MapPin className="size-3.5" /> {t("contact.studioLabel")}
              </p>
              <p className="mt-2 text-sm text-foreground">{ADDRESS}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t("contact.mapNote")}</p>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-card p-8 sm:p-10">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.25em] text-primary uppercase">{t("contact.connect")}</p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://instagram.com/${IG_HANDLE.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid size-8 place-items-center rounded-full bg-accent hover:bg-accent/70"
                >
                  <Instagram className="size-4 text-primary" />
                </a>
                <a
                  href={TIKTOK_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="grid size-8 place-items-center rounded-full bg-accent hover:bg-accent/70"
                >
                  <TikTokIcon className="size-4 text-primary" />
                </a>
                <a
                  href="https://wa.me/6281200000000"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid size-8 place-items-center rounded-full bg-accent hover:bg-accent/70"
                >
                  <WhatsAppIcon className="size-4 text-primary" />
                </a>
              </div>
            </div>

            <h3 className="mt-4 font-display text-2xl text-foreground">{t("contact.heading")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact.desc")}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                required
                placeholder={t("contact.namePlaceholder")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                required
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder={t("contact.subjectPlaceholder")}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <Textarea
                placeholder={t("contact.messagePlaceholder")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={status === "sending"}
                className="w-full rounded-full"
              >
                <Send className="size-4" />
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </Button>

              {status === "sent" ? (
                <p className="text-center text-xs text-primary">{t("contact.sent")}</p>
              ) : null}
              {status === "error" ? (
                <p className="text-center text-xs text-red-500">{t("contact.error")}</p>
              ) : null}
            </form>

            <div className="mt-6 space-y-1.5 border-t border-border pt-6 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <WhatsAppIcon className="size-3.5" /> {WA_NUMBER}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-3.5" /> {EMAIL}
              </p>
              <p className="mt-2">{t("contact.placeholderNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
