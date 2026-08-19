import { useEffect, useState } from "react";

import { fetchPublic } from "@/lib/api";

/** Fetches a public content list once on mount. Empty array while loading/on error. */
export function useApiList<T>(path: string): { items: T[]; loading: boolean } {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPublic<T>(path)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return { items, loading };
}
