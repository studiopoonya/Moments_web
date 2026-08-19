import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

export function ImageUploadField({
  label,
  file,
  existingUrl,
  onChange,
  required,
  aspect = "aspect-square",
}: {
  label: string;
  file: File | null;
  existingUrl?: string | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {previewUrl ? (
        <div className={`relative w-32 overflow-hidden rounded-xl border border-border ${aspect}`}>
          <img src={previewUrl} alt="" className="size-full object-cover" />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-x-0 bottom-0 bg-black/50 py-1 text-[10px] text-white hover:bg-black/70"
          >
            Ganti
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-32 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary ${aspect}`}
        >
          <ImagePlus className="size-5" />
          <span className="text-[10px]">Upload</span>
        </button>
      )}
    </div>
  );
}
