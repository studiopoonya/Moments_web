import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";
import { useApiList } from "@/lib/useApiList";
import type { SpecialOfferItem } from "@/lib/api";

const rotations = [-4, 3, -3, 5, -2, 4];

export function PromotionsCollage() {
  const { t } = useTranslation();
  const { items: offers } = useApiList<SpecialOfferItem>("/special-offers");
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = offers.find((o) => o.id === activeId) ?? null;

  if (offers.length === 0) return null;

  return (
    <section id="promo" className="board-texture overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-white/70 uppercase">{t("promo.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">{t("promo.title")}</h2>
          <p className="mt-3 text-sm text-white/70">{t("promo.subtitle")}</p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-x-6 gap-y-12 px-2">
          {offers.map((offer, i) => (
            <motion.button
              key={offer.id}
              type="button"
              layoutId={`promo-card-${offer.id}`}
              onClick={() => setActiveId(offer.id)}
              style={{ rotate: rotations[i % rotations.length] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-40 shrink-0 cursor-zoom-in overflow-hidden rounded-lg shadow-[0_18px_30px_-10px_rgba(0,0,0,0.5)] sm:w-48"
            >
              <span className="pin-dot" aria-hidden />
              <div className="aspect-[3/4] bg-muted">
                {offer.image_url ? (
                  <img src={offer.image_url} alt={offer.title ?? "Promo"} className="size-full object-cover" />
                ) : null}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              layoutId={`promo-card-${active.id}`}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-elegant"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                <X className="size-4" />
              </button>
              {active.image_url ? (
                <img src={active.image_url} alt={active.title ?? "Promo"} className="w-full object-cover" />
              ) : null}
              {active.link_url ? (
                <a
                  href={active.link_url}
                  onClick={() => setActiveId(null)}
                  className="block bg-card px-6 py-4 text-center text-sm font-medium text-primary hover:bg-accent"
                >
                  {t("promo.cta")}
                </a>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
