import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/poonya/LanguageSwitcher";
import { useApiList } from "@/lib/useApiList";
import type { SpecialOfferItem } from "@/lib/api";

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { items: offers } = useApiList<SpecialOfferItem>("/special-offers");

  const links = [
    { label: t("nav.tentang"), href: "#tentang" },
    { label: t("nav.layanan"), href: "#layanan" },
    { label: t("nav.galeri"), href: "#galeri" },
    { label: t("nav.paket"), href: "#paket" },
    ...(offers.length > 0 ? [{ label: t("nav.promo"), href: "#promo" }] : []),
    { label: t("nav.kontak"), href: "#kontak" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-sm"
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between">
        <a href="#hero" className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-display text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
            Poonya Moments
          </span>
          <span className="truncate text-[11px] italic tracking-[0.18em] text-primary/80">
            by Studio Poonya
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/75 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </div>
          <LanguageSwitcher />
          <Button asChild variant="brand" className="rounded-full px-6">
            <a href="#kontak">{t("nav.booking")}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full border border-border p-2 text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-border/70 lg:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-foreground/85 hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="brand" className="mt-3 rounded-full">
              <a href="#kontak" onClick={() => setOpen(false)}>
                {t("nav.booking")}
              </a>
            </Button>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
