import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/poonya/Reveal";
import { getIcon } from "@/lib/iconRegistry";
import { useApiList } from "@/lib/useApiList";
import type { WhyUsItemT } from "@/lib/api";

const chips = [
  "bg-rose-100 text-rose-500",
  "bg-sky-100 text-sky-500",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
  "bg-indigo-100 text-indigo-600",
];

export function WhyChooseUs() {
  const { t } = useTranslation();
  const { items: reasons } = useApiList<WhyUsItemT>("/why-us-items");

  if (reasons.length === 0) return null;

  return (
    <section className="bg-muted/40 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("whyus.eyebrow")}</p>
          <h2 className="mt-5 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
            {t("whyus.title")} <span className="text-primary">{t("whyus.titleAccent")}</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">{t("whyus.subtitle")}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = getIcon(r.icon);
            return (
              <StaggerItem key={r.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="card-soft h-full p-6 hover:shadow-md"
                >
                  <span className={`grid size-11 place-items-center rounded-2xl ${chips[i % chips.length]}`}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
