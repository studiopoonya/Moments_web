import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { WhatsAppIcon } from "@/components/poonya/icons";
import { waClickApi } from "@/lib/api";

const WA_LINK = "https://wa.me/6281200000000"; // placeholder

export function WhatsAppFab() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-2"
    >
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        className="relative rounded-full bg-card px-4 py-2 text-xs font-medium text-foreground shadow-elegant"
      >
        {t("wa.chatNow")}
        <span className="absolute -bottom-1 right-6 size-3 rotate-45 bg-card" aria-hidden />
      </motion.span>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat via WhatsApp"
        onClick={() => waClickApi.track()}
        className="relative grid size-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" aria-hidden />
        <span className="absolute -inset-1.5 animate-ping rounded-full bg-[#25D366]/30 [animation-delay:0.4s]" aria-hidden />
        <WhatsAppIcon className="relative size-7" />
      </a>
    </motion.div>
  );
}
