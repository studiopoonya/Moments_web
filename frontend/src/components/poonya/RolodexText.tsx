import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through `words` with a fade + 3D "rolodex" flip transition.
 * Auto-advances every `interval` ms and loops back to the start.
 */
export function RolodexText({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  const current = words[index] ?? "";

  return (
    <span
      className="relative inline-block align-baseline"
      style={{ perspective: "600px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, rotateX: 90, y: -6 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: -90, y: 6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
          className={className}
        >
          {current}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
