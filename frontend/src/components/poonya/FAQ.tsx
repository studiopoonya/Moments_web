import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";
import { Button } from "@/components/ui/button";
import { useApiList } from "@/lib/useApiList";
import type { FaqItemT } from "@/lib/api";

export function FAQ() {
  const { t } = useTranslation();
  const { items: faqs } = useApiList<FaqItemT>("/faqs");
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-muted/40 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("faq.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
            {t("faq.title")} <span className="text-primary">{t("faq.titleAccent")}</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("faq.subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.id} className="card-soft overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-accent"
                  >
                    <Plus className="size-3.5 text-primary" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">{t("faq.moreQuestion")}</p>
          <Button asChild variant="brand" className="mt-4 rounded-full">
            <a href="https://wa.me/6281200000000" target="_blank" rel="noreferrer">
              {t("faq.askWa")}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
