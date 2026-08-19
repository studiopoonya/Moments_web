import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { emoji: "📸", className: "top-6 left-6 sm:left-10", delay: 0 },
  { emoji: "🎉", className: "top-10 right-6 sm:right-10", delay: 0.6 },
  { emoji: "✨", className: "bottom-8 left-8 sm:left-16", delay: 1.2 },
  { emoji: "💙", className: "bottom-10 right-8 sm:right-16", delay: 1.8 },
];

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="bg-background px-5 py-16 sm:py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,oklch(0.22_0.05_258),oklch(0.32_0.09_255))] px-6 py-16 text-center sm:px-12 sm:py-20">
          {floatingIcons.map((f) => (
            <motion.span
              key={f.className}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
              className={`absolute grid size-11 place-items-center rounded-2xl bg-white/10 text-xl backdrop-blur-sm ${f.className}`}
            >
              {f.emoji}
            </motion.span>
          ))}

          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">{t("finalCta.eyebrow")}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-white sm:text-5xl">
            {t("finalCta.title")} <span className="text-primary">{t("finalCta.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-white/70">{t("finalCta.subtitle")}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="brand" size="xl" className="rounded-full">
              <a href="#paket">{t("finalCta.claimBtn")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://wa.me/6281200000000" target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> {t("finalCta.waBtn")}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
