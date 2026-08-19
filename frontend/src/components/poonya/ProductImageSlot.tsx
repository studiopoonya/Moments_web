import { motion } from "framer-motion";

/**
 * PRODUCT IMAGE SLOT
 * -------------------------------------------------------------
 * Placeholder untuk FOTO PRODUK ASLI (photobooth Poonya Moments).
 * Cara mengganti nanti:
 *   1. Simpan foto di `src/assets/`, mis. `hero-photobooth.jpg`
 *   2. Di App.tsx: `import heroProductImage from "@/assets/hero-photobooth.jpg"`
 *   3. Kirim ke komponen: <ProductImageSlot src={heroProductImage} alt="..." />
 * Selama `src` kosong, frame tampil sebagai placeholder polos bercahaya.
 */
export function ProductImageSlot({
  src,
  alt = "Foto produk photobooth Poonya Moments",
  label = "Product Image Slot",
  hint = "Foto produk asli akan ditempatkan di sini",
  className,
  ratio = "aspect-[4/5]",
  tone = "brand",
  animated = true,
}: {
  src?: string | undefined;
  alt?: string;
  label?: string;
  hint?: string;
  className?: string;
  ratio?: string;
  /** "brand" = frosted-glass look for use on the blue Hero. "light" = card look for white/light sections. */
  tone?: "brand" | "light";
  /** Continuous float + glow-pulse loops. Keep this off when several slots render
   * at once (e.g. the stacking product cards) — each loop is a perpetual
   * requestAnimationFrame tick, and stacking them adds up to visible jank. */
  animated?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <motion.div
      className={`relative mx-auto w-full max-w-md ${className ?? ""}`}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* soft glow di balik frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background: isLight
            ? "radial-gradient(circle at 50% 40%, oklch(0.71 0.163 240.2 / 0.18), oklch(0.949 0.036 76.5 / 0.28) 45%, transparent 70%)"
            : "radial-gradient(circle at 50% 40%, oklch(1 0 0 / 0.35), oklch(0.949 0.036 76.5 / 0.18) 45%, transparent 70%)",
        }}
        animate={animated ? { opacity: [0.55, 0.9, 0.55], scale: [0.98, 1.03, 0.98] } : { opacity: 0.7 }}
        transition={animated ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
      />

      <motion.div
        animate={animated ? { y: [0, -10, 0] } : { y: 0 }}
        transition={animated ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
        className={`overflow-hidden rounded-[2rem] ${
          isLight ? "border border-border shadow-elegant" : "border border-white/25 shadow-elegant"
        }`}
        style={{
          background: isLight
            ? "linear-gradient(155deg, oklch(0.98 0.012 240), oklch(0.94 0.03 76.5))"
            : "linear-gradient(155deg, oklch(1 0 0 / 0.22), oklch(1 0 0 / 0.06) 55%, oklch(0.949 0.036 76.5 / 0.12))",
          backdropFilter: isLight ? undefined : "blur(6px)",
        }}
      >
        {src ? (
          <img src={src} alt={alt} className={`w-full ${ratio} object-cover`} />
        ) : (
          <div className={`grid w-full ${ratio} place-items-center px-6 text-center`}>
            <div>
              <p
                className={`text-[10px] tracking-[0.3em] uppercase ${isLight ? "text-muted-foreground" : "text-white/70"}`}
              >
                {label}
              </p>
              <p
                className={`mt-3 font-display text-lg italic ${isLight ? "text-foreground/70" : "text-white/85"}`}
              >
                {hint}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
