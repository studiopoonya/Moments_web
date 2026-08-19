import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function StatsBar() {
  const { t } = useTranslation();

  const stats = [
    { emoji: "🎉", value: "500+", label: t("stats.events") },
    { emoji: "⭐", value: t("stats.experienceValue"), label: t("stats.experience") },
    { emoji: "🏆", value: "4.9", label: t("stats.rating") },
    { emoji: "💙", value: "2000+", label: t("stats.customers") },
    { emoji: "📍", value: t("stats.area"), label: t("stats.areaLabel") },
  ];

  return (
    <section className="relative bg-[oklch(0.2_0.04_258)] py-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 divide-x divide-white/10 px-5 text-center sm:flex-nowrap sm:justify-between"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex items-center gap-2 pl-0 first:pl-0 sm:px-6 sm:first:pl-0"
          >
            <span className="text-xl">{s.emoji}</span>
            <p className="text-sm whitespace-nowrap text-white">
              <span className="font-semibold">{s.value}</span>{" "}
              <span className="text-white/60">{s.label}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
