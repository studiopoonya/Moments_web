import { useTranslation } from "react-i18next";
import { Instagram, Mail } from "lucide-react";

import { TikTokIcon, WhatsAppIcon } from "@/components/poonya/icons";

const WA_LINK = "https://wa.me/6281200000000"; // placeholder
const IG_LINK = "https://instagram.com/poonyamoments"; // placeholder
const TIKTOK_LINK = "https://tiktok.com/@poonyamoments"; // placeholder
const EMAIL = "hello@poonyamoments.id"; // placeholder

const anchors = ["#paket", "#paket", "#paket", "#kontak"];
const infoAnchors = ["#tentang", "#cara-booking", "#faq", "#kontak"];

export function Footer() {
  const { t } = useTranslation();
  const layananItems = t("footer.layananItems", { returnObjects: true }) as unknown as string[];
  const informasiItems = t("footer.informasiItems", { returnObjects: true }) as unknown as string[];

  return (
    <footer className="bg-[oklch(0.16_0.03_258)] pt-16 pb-8 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">{t("hero.brandName")}</p>
          <p className="text-xs italic tracking-[0.18em] text-white/50">{t("hero.brandSub")}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t("footer.desc")}</p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={IG_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <TikTokIcon className="size-4" />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">{t("footer.layanan")}</p>
          <ul className="mt-4 space-y-2.5">
            {layananItems.map((label, i) => (
              <li key={label}>
                <a href={anchors[i]} className="text-sm text-white/60 hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">{t("footer.informasi")}</p>
          <ul className="mt-4 space-y-2.5">
            {informasiItems.map((label, i) => (
              <li key={label}>
                <a href={infoAnchors[i]} className="text-sm text-white/60 hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 px-5 pt-6">
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} PT. Poonya Kita Bersama. {t("footer.rights")}</p>
          <p>{t("footer.madeWith")}</p>
        </div>
        <p className="mt-2 text-center text-[11px] text-white/30 sm:text-left">{t("footer.placeholderNote")}</p>
      </div>
    </footer>
  );
}
