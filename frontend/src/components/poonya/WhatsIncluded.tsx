import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/poonya/Reveal";

export function WhatsIncluded() {
  const { t } = useTranslation();
  const included = t("included.items", { returnObjects: true }) as unknown as string[];

  return (
    <section className="bg-background pt-4 pb-24 sm:pt-6 sm:pb-28">
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl shadow-elegant"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[linear-gradient(135deg,var(--sky-brand),var(--deep-brand))] px-6 py-4 text-white sm:px-8">
            <p className="text-sm font-semibold tracking-wide sm:text-base">
              {included.length} {t("included.banner")}
            </p>
            <p className="text-xs text-white/80">{t("included.badge")}</p>
          </div>

          <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-4 bg-card p-6 sm:grid-cols-5 sm:px-8 sm:py-7" stagger={0.05}>
            {included.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-center gap-2">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent">
                    <Check className="size-3 text-primary" />
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </motion.div>
      </div>
    </section>
  );
}
