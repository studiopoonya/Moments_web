import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/poonya/Reveal";
import { useApiList } from "@/lib/useApiList";
import type { PortfolioItemT } from "@/lib/api";

export function Gallery() {
  const { t } = useTranslation();
  const { items: photos } = useApiList<PortfolioItemT>("/portfolio");
  const loop = [...photos, ...photos];

  if (photos.length === 0) return null;

  return (
    <section id="galeri" className="overflow-hidden bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("gallery.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("gallery.title")}</h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="group relative mt-12 overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <figure key={`${p.id}-${i}`} className="card-soft w-52 shrink-0 overflow-hidden p-2 sm:w-60">
                <div className="overflow-hidden rounded-2xl">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.label ?? ""}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/5] w-full bg-muted" />
                  )}
                </div>
                {p.label ? (
                  <figcaption className="px-2 py-3 text-center text-xs text-muted-foreground">{p.label}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
