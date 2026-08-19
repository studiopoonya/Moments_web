import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Instagram } from "lucide-react";

import { Reveal } from "@/components/poonya/Reveal";
import { TikTokIcon, WhatsAppIcon } from "@/components/poonya/icons";

const IG_LINK = "https://instagram.com/poonyamoments"; // placeholder
const TIKTOK_LINK = "https://tiktok.com/@poonyamoments"; // placeholder
const WA_LINK = "https://wa.me/6281200000000"; // placeholder

const links = [
  { href: IG_LINK, label: "Instagram", icon: Instagram, bg: "hover:bg-[#E1306C]" },
  { href: TIKTOK_LINK, label: "TikTok", icon: TikTokIcon, bg: "hover:bg-black" },
  { href: WA_LINK, label: "WhatsApp", icon: WhatsAppIcon, bg: "hover:bg-[#25D366]" },
];

export function SocialLinks() {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-14">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("social.title")}</p>
        <div className="flex items-center gap-3">
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              aria-label={l.label}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.25 }}
              className={`grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-white ${l.bg}`}
            >
              <l.icon className="size-5" />
            </motion.a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
