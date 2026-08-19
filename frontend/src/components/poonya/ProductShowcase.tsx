import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { ProductImageSlot } from "@/components/poonya/ProductImageSlot";
import { Reveal } from "@/components/poonya/Reveal";
import { useApiList } from "@/lib/useApiList";
import type { Product } from "@/lib/api";

function ProductCard({
  index,
  total,
  product,
  progress,
  range,
  targetScale,
}: {
  index: number;
  total: number;
  product: Product;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={cardRef} className="sticky top-20 flex h-[68vh] items-center justify-center sm:h-[74vh]">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 22}px)` }}
        className="card-soft relative grid w-full max-w-5xl origin-top gap-8 overflow-hidden p-6 shadow-elegant sm:p-10 lg:grid-cols-2 lg:gap-12"
      >
        <ProductImageSlot
          tone="light"
          animated={false}
          src={product.image_url ?? undefined}
          label={product.badge}
          hint={product.name}
        />
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
            {product.badge}
            <span className="font-normal text-muted-foreground normal-case">
              0{index + 1}/0{total}
            </span>
          </span>
          <h3 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">{product.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{product.description}</p>

          {product.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export function ProductShowcase() {
  const { t } = useTranslation();
  const { items: products } = useApiList<Product>("/products");
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (products.length === 0) return null;

  return (
    <section id="layanan" className="bg-muted/40 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">{t("products.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">{t("products.title")}</h2>
        </Reveal>
      </div>

      {/* Buffer besar di sini disengaja: kartu pertama baru boleh mulai "nempel"
          (sticky) setelah judul section ini benar-benar lewat dari viewport,
          kalau jaraknya kurang, kartu bakal nabrak/nutupin judul saat di-scroll. */}
      <div ref={container} className="relative mt-40 sm:mt-48">
        {products.map((product, i) => {
          const targetScale = 1 - (products.length - i) * 0.05;
          return (
            <ProductCard
              key={product.id}
              index={i}
              total={products.length}
              product={product}
              progress={scrollYProgress}
              range={[i / products.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
