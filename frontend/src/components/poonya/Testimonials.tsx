import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/poonya/Reveal";
import { useApiList } from "@/lib/useApiList";
import type { TestimonialItem } from "@/lib/api";

const AVATAR_COLORS = [
  "bg-rose-400",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-red-400",
  "bg-indigo-500",
];

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function TestimonialCard({ item, colorIndex }: { item: TestimonialItem; colorIndex: number }) {
  return (
    <div className="card-soft w-80 shrink-0 p-6 sm:w-96">
      <div className="flex items-center gap-3">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]}`}
        >
          {initials(item.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
          <p className="truncate text-xs text-muted-foreground">{item.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
    </div>
  );
}

export function Testimonials() {
  const { t } = useTranslation();
  const { items: testimonials } = useApiList<TestimonialItem>("/testimonials");
  const row1 = testimonials.filter((t) => t.row === 1);
  const row2 = testimonials.filter((t) => t.row === 2);
  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="bg-muted/40 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("testimonials.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("testimonials.title")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">{t("testimonials.subtitle")}</p>
        </Reveal>
      </div>

      <div className="mt-12 space-y-4">
        {row1.length > 0 ? (
          <div className="group relative overflow-hidden">
            <div className="animate-marquee-left flex w-max gap-4 group-hover:[animation-play-state:paused]">
              {loop1.map((item, i) => (
                <TestimonialCard key={`${item.id}-${i}`} item={item} colorIndex={i} />
              ))}
            </div>
          </div>
        ) : null}

        {row2.length > 0 ? (
          <div className="group relative overflow-hidden">
            <div className="animate-marquee-right flex w-max gap-4 group-hover:[animation-play-state:paused]">
              {loop2.map((item, i) => (
                <TestimonialCard key={`${item.id}-${i}`} item={item} colorIndex={i + 4} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
