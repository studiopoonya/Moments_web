import { useTranslation } from "react-i18next";

const languages = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "id";

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-muted/60 p-0.5 text-xs font-medium ${className ?? ""}`}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => i18n.changeLanguage(l.code)}
          aria-pressed={current === l.code}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            current === l.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
