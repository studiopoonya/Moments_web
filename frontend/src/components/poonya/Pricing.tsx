import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/poonya/Reveal";
import { Button } from "@/components/ui/button";
import { useApiList } from "@/lib/useApiList";
import type { Package } from "@/lib/api";

const FEATURE_COUNT = 10;

export function Pricing() {
  const { t } = useTranslation();
  const { items: packages } = useApiList<Package>("/packages");

  if (packages.length === 0) return null;

  return (
    <section id="paket" className="bg-background pt-24 pb-8 sm:pt-28 sm:pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">{t("pricing.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("pricing.title")}</h2>
          <span className="mt-4 inline-block rounded-full border border-border px-4 py-1 text-[11px] text-muted-foreground">
            {t("pricing.note")}
          </span>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => {
            const isCustom = p.price === "Contact Us";
            return (
              <StaggerItem key={p.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex h-full flex-col rounded-3xl p-7 ${
                    p.highlight
                      ? "border-2 border-primary bg-card shadow-[0_20px_45px_-15px_oklch(0.6_0.2_255/0.35)]"
                      : "card-soft"
                  }`}
                >
                  {p.highlight ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,var(--sky-brand),var(--deep-brand))] px-4 py-1 text-[11px] font-semibold tracking-wide text-white shadow-md">
                      {t("pricing.terlaris")}
                    </span>
                  ) : null}

                  <span className="text-2xl">{p.emoji}</span>
                  <h3 className="mt-3 font-display text-xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.meta}</p>

                  <p className="mt-5 text-[11px] tracking-widest text-muted-foreground uppercase">
                    {isCustom ? t("pricing.penawaran") : t("pricing.mulaiDari")}
                  </p>
                  <p className="font-display text-3xl font-semibold text-foreground">
                    {isCustom ? <span className="text-primary">{p.price}</span> : p.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                  <div className="mt-6 flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-xs text-cream-foreground">
                    <Check className="size-3.5 shrink-0 text-primary" />
                    {t("pricing.fasilitasTermasuk", { count: FEATURE_COUNT })}
                  </div>

                  <Button asChild variant={p.highlight ? "brand" : "outline"} className="mt-6 rounded-full">
                    <a href="#kontak">{isCustom ? t("pricing.hubungiKami") : t("pricing.pilihPaket")}</a>
                  </Button>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
