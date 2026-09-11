import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/poonya/Reveal";
import { useApiList } from "@/lib/useApiList";
import type { ClientItem } from "@/lib/api";

function ClientBadge({ client }: { client: ClientItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 shadow-sm">
      <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-md bg-accent font-display text-sm font-semibold text-primary">
        {client.logo_url ? (
          <img src={client.logo_url} alt={client.name} className="size-full object-cover" />
        ) : (
          client.name[0]
        )}
      </span>
      <span className="font-display text-base tracking-wide text-foreground whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
}

export function Clients() {
  const { t } = useTranslation();
  const { items: clients } = useApiList<ClientItem>("/clients");
  // Duplicated so the CSS marquee loop (translateX -50%) is seamless.
  const loop = [...clients, ...clients];

  if (clients.length === 0) return null;

  return (
    <section id="clients" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("clients.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("clients.title")}</h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="group relative mt-14 overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {loop.map((client, i) => (
              <ClientBadge key={`${client.id}-${i}`} client={client} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
