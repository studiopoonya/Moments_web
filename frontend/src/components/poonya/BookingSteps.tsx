import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarCheck, PartyPopper, Camera, Share2 } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";

const icons = [CalendarCheck, PartyPopper, Camera, Share2];
const chips = ["bg-sky-100 text-sky-600", "bg-violet-100 text-violet-600", "bg-emerald-100 text-emerald-600", "bg-amber-100 text-amber-600"];
const badges = ["bg-sky-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"];

type Step = { title: string; text: string };

export function BookingSteps() {
  const { t } = useTranslation();
  const steps = t("booking.steps", { returnObjects: true }) as unknown as Step[];

  return (
    <section id="cara-booking" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("booking.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
            {t("booking.title")} <span className="text-primary">{t("booking.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{t("booking.subtitle")}</p>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute top-9 right-0 left-0 hidden h-px bg-border sm:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute top-9 left-0 hidden h-px w-full bg-primary/40 sm:block"
          />

          <div className="grid gap-10 sm:grid-cols-4 sm:gap-6">
            {steps.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={s.title} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center sm:text-left"
                  >
                    <div className="relative inline-block">
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`grid size-16 place-items-center rounded-2xl ${chips[i % chips.length]}`}
                      >
                        <Icon className="size-7" />
                      </motion.span>
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 + 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`absolute -top-2 -right-2 grid size-6 place-items-center rounded-full text-[11px] font-bold text-white shadow-md ${badges[i % badges.length]}`}
                      >
                        {i + 1}
                      </motion.span>
                    </div>
                    <h3 className="mt-5 font-display text-xl text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
