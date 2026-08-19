import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Heart, Cake, Building2, Users, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/poonya/Navbar";
import { ProductImageSlot } from "@/components/poonya/ProductImageSlot";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/poonya/Reveal";
import { RolodexText } from "@/components/poonya/RolodexText";
import { StatsBar } from "@/components/poonya/StatsBar";
import { ProductShowcase } from "@/components/poonya/ProductShowcase";
import { WhyChooseUs } from "@/components/poonya/WhyChooseUs";
import { BookingSteps } from "@/components/poonya/BookingSteps";
import { WhatsIncluded } from "@/components/poonya/WhatsIncluded";
import { Pricing } from "@/components/poonya/Pricing";
import { Clients } from "@/components/poonya/Clients";
import { Testimonials } from "@/components/poonya/Testimonials";
import { Gallery } from "@/components/poonya/Gallery";
import { PromotionsCollage } from "@/components/poonya/PromotionsCollage";
import { SocialLinks } from "@/components/poonya/SocialLinks";
import { FAQ } from "@/components/poonya/FAQ";
import { ContactSection } from "@/components/poonya/ContactSection";
import { FinalCta } from "@/components/poonya/FinalCta";
import { Footer } from "@/components/poonya/Footer";
import { PromoPopup } from "@/components/poonya/PromoPopup";
import { WhatsAppFab } from "@/components/poonya/WhatsAppFab";

// SLOT FOTO PRODUK — isi dengan foto asli nanti:
// import heroProductImage from "@/assets/hero-photobooth.jpg";
const heroProductImage: string | undefined = undefined;

// Set true untuk menampilkan lagi section "Jenis Event".
const SHOW_EVENT_TYPES = false;

// Set true untuk menampilkan lagi section "Ikuti Kami" yang berdiri sendiri.
// Untuk sekarang social links cukup di satu tempat: panel "Connect" di section Kontak.
const SHOW_SOCIAL_SECTION = false;

const eventIcons = [Heart, Cake, Building2, Users, Store];

type EventItem = { title: string; text: string };

export function Landing() {
  const { t } = useTranslation();
  const events = t("events.items", { returnObjects: true }) as unknown as EventItem[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO — satu-satunya section full-blue, tipografi + permainan cahaya.
          Transisi ke section berikutnya pakai fade internal (bukan seam block
          terpisah) supaya blend-nya mulus, bukan patah. */}
      <section id="hero" className="brand-surface relative pt-32 pb-32 sm:pt-40 sm:pb-40">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
                {t("hero.brandName")}
              </p>
              <p className="mt-1 text-[11px] italic tracking-[0.28em] text-cream/85 uppercase">
                {t("hero.brandSub")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="mt-8 min-h-[3.6em] font-display text-3xl italic leading-[1.2] text-balance-tight sm:min-h-[2.6em] sm:text-5xl">
                {t("hero.taglinePrefix")}{" "}
                <RolodexText words={events.map((e) => e.title)} className="text-cream" />
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mx-auto mt-6 max-w-md text-base text-white/85 sm:text-lg lg:mx-0">
                {t("hero.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }}>
                  <Button asChild variant="hero" size="xl">
                    <a href="#kontak">{t("hero.ctaBooking")}</a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }}>
                  <Button asChild variant="heroOutline" size="xl">
                    <a href="#paket">{t("hero.ctaPaket")}</a>
                  </Button>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Ganti `heroProductImage` dengan foto produk asli nanti */}
          <ProductImageSlot
            src={heroProductImage}
            alt={t("hero.productAlt")}
            hint={t("hero.productHint")}
          />
        </div>

        {/* Fade halus ke section berikutnya — tinggi & tanpa batas tegas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,oklch(0.2_0.04_258)_100%)]"
        />
      </section>

      <StatsBar />

      {/* TENTANG */}
      <section id="tentang" className="bg-background py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("about.eyebrow")}</p>
            <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("about.title")}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.body")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 font-display text-2xl italic text-primary">{t("about.quote")}</p>
          </Reveal>
        </div>
      </section>

      <ProductShowcase />

      {/* EVENT TYPES — disembunyikan sementara atas permintaan, markup & data
          dibiarkan supaya gampang diaktifkan lagi nanti. */}
      {SHOW_EVENT_TYPES ? (
        <section className="bg-background py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="text-center">
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t("events.eyebrow")}</p>
              <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("events.title")}</h2>
            </Reveal>
            <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e, i) => {
                const Icon = eventIcons[i % eventIcons.length];
                return (
                  <StaggerItem key={e.title}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="card-soft h-full p-8 hover:shadow-md"
                    >
                      <span className="grid size-12 place-items-center rounded-2xl bg-accent">
                        <Icon className="size-5 text-primary" />
                      </span>
                      <h3 className="mt-6 font-display text-2xl text-foreground">{e.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>
      ) : null}

      <WhyChooseUs />

      <BookingSteps />

      <Pricing />

      <WhatsIncluded />

      <Clients />

      <Testimonials />

      <Gallery />

      <PromotionsCollage />

      {SHOW_SOCIAL_SECTION ? <SocialLinks /> : null}

      <FAQ />

      <ContactSection />

      <FinalCta />

      <Footer />

      <PromoPopup />
      <WhatsAppFab />
    </div>
  );
}
