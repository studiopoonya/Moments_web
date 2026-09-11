import { ICON_NAMES, getIcon } from "@/lib/iconRegistry";

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  return (
    <div className="grid grid-cols-8 gap-2 rounded-2xl border border-border p-3 sm:grid-cols-10">
      {ICON_NAMES.map((name) => {
        const Icon = getIcon(name);
        const active = name === value;
        return (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onChange(name)}
            className={`grid size-9 place-items-center rounded-xl border transition-colors ${
              active
                ? "border-primary bg-accent text-primary"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
