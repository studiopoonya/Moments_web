import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Check, Mail as MailIcon, Phone, Sparkles, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { popupSettingApi, submitLead, type PopupSettingT } from "@/lib/api";

const SESSION_KEY = "poonya_promo_popup_shown";

const floatingIcons = [
  { emoji: "🎁", className: "top-4 left-5", delay: 0 },
  { emoji: "✨", className: "top-6 right-14", delay: 0.5 },
  { emoji: "🎉", className: "bottom-4 left-10", delay: 1 },
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldMotion = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function PromoPopup() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<PopupSettingT | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    let cancelled = false;
    popupSettingApi
      .getPublic()
      .then((data) => {
        if (!cancelled) setSettings(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!settings || !settings.enabled) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, settings.delay_seconds * 1000);
    return () => clearTimeout(timer);
  }, [settings]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitLead({ source: "promo_popup", name: form.name, phone: form.phone, email: form.email });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-elegant"
          >
            {status === "sent" ? (
              <div className="bg-card px-7 py-10 text-center">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-500"
                >
                  <Check className="size-7" />
                </motion.span>
                <h3 className="mt-5 font-display text-2xl text-foreground">{t("popup.titleThanks")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("popup.descThanks")}</p>
                <Button variant="brand" className="mt-6 w-full rounded-full" onClick={() => setOpen(false)}>
                  {t("popup.close")}
                </Button>
              </div>
            ) : (
              <>
                <div className="brand-surface relative px-7 pt-8 pb-11">
                  {floatingIcons.map((f) => (
                    <motion.span
                      key={f.className}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                      className={`pointer-events-none absolute text-lg opacity-80 ${f.className}`}
                      aria-hidden
                    >
                      {f.emoji}
                    </motion.span>
                  ))}

                  <button
                    type="button"
                    aria-label={t("popup.close")}
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  >
                    <X className="size-4" />
                  </button>

                  <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm">
                    <Sparkles className="size-3" />
                    {settings?.badge || t("popup.badge")}
                  </span>

                  <h3 className="relative mt-4 max-w-[15rem] font-display text-2xl leading-tight text-white sm:text-3xl">
                    {settings?.title || t("popup.title")}
                  </h3>
                  {settings?.title_accent || t("popup.titleAccent") ? (
                    <span className="relative mt-2 inline-flex items-center rounded-full bg-cream px-3.5 py-1.5 text-sm font-semibold text-cream-foreground shadow-sm">
                      {settings?.title_accent || t("popup.titleAccent")}
                    </span>
                  ) : null}
                  <p className="relative mt-3 max-w-[16rem] text-sm text-white/75">
                    {settings?.description || t("popup.desc")}
                  </p>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4 bg-card px-7 pt-6 pb-7"
                  initial="hidden"
                  animate="show"
                  transition={{ staggerChildren: 0.06, delayChildren: 0.1 }}
                >
                  <motion.div variants={fieldMotion}>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">
                      {t("popup.nameLabel")}
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        placeholder={t("popup.namePlaceholder")}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={fieldMotion}>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">{t("popup.phoneLabel")}</label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        type="tel"
                        placeholder={t("popup.phonePlaceholder")}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={fieldMotion}>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">{t("popup.emailLabel")}</label>
                    <div className="relative">
                      <MailIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder={t("popup.emailPlaceholder")}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fieldMotion}>
                    <Button
                      type="submit"
                      variant="brand"
                      size="lg"
                      disabled={status === "sending"}
                      className="w-full rounded-full"
                    >
                      {status === "sending" ? t("popup.sending") : t("popup.submit")}
                    </Button>
                  </motion.div>

                  {status === "error" ? (
                    <p className="text-center text-xs text-red-500">{t("popup.error")}</p>
                  ) : null}

                  <motion.p
                    variants={fieldMotion}
                    className="text-center text-[11px] leading-relaxed text-muted-foreground"
                  >
                    {settings?.consent_text || t("popup.consent")}
                  </motion.p>
                </motion.form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
