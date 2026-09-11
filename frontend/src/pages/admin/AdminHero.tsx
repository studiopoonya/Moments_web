import { useEffect, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminToken } from "@/lib/auth";
import { heroSettingApi, heroWordsApi, type HeroSettingT, type HeroWordT } from "@/lib/api";

export function AdminHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [brandName, setBrandName] = useState("");
  const [brandSub, setBrandSub] = useState("");
  const [taglinePrefix, setTaglinePrefix] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [ctaBooking, setCtaBooking] = useState("");
  const [ctaPaket, setCtaPaket] = useState("");

  const [words, setWords] = useState<HeroWordT[]>([]);
  const [newWord, setNewWord] = useState("");
  const [wordsLoading, setWordsLoading] = useState(true);

  function loadWords() {
    const token = getAdminToken();
    if (!token) return;
    setWordsLoading(true);
    heroWordsApi.list(token).then(setWords).finally(() => setWordsLoading(false));
  }

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    heroSettingApi
      .get(token)
      .then((data: HeroSettingT) => {
        setBrandName(data.brand_name);
        setBrandSub(data.brand_sub ?? "");
        setTaglinePrefix(data.tagline_prefix ?? "");
        setSubtitle(data.subtitle ?? "");
        setCtaBooking(data.cta_booking_label ?? "");
        setCtaPaket(data.cta_paket_label ?? "");
        setExistingImageUrl(data.image_url);
      })
      .finally(() => setLoading(false));
    loadWords();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setSaved(false);
    try {
      const data = new FormData();
      data.append("brand_name", brandName);
      data.append("brand_sub", brandSub);
      data.append("tagline_prefix", taglinePrefix);
      data.append("subtitle", subtitle);
      data.append("cta_booking_label", ctaBooking);
      data.append("cta_paket_label", ctaPaket);
      if (image) data.append("image", image);

      const updated = await heroSettingApi.update(token, data);
      setExistingImageUrl(updated.image_url);
      setImage(null);
      setSaved(true);
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddWord(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !newWord.trim()) return;
    const data = new FormData();
    data.append("word", newWord.trim());
    data.append("sort_order", String(words.length));
    await heroWordsApi.create(token, data);
    setNewWord("");
    loadWords();
  }

  async function handleDeleteWord(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus kata ini?")) return;
    await heroWordsApi.remove(token, id);
    loadWords();
  }

  return (
    <AdminLayout title="Hero" subtitle="Kelola headline, subtitle, foto, dan kata yang berganti-ganti di Hero">
      {loading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : (
        <form onSubmit={handleSubmit} className="card-soft max-w-xl space-y-5 p-6">
          <ImageUploadField
            label="Foto Produk (di samping headline)"
            file={image}
            existingUrl={existingImageUrl}
            onChange={setImage}
            aspect="aspect-[4/5]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Nama Brand</label>
              <Input required value={brandName} onChange={(e) => setBrandName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Sub Brand</label>
              <Input value={brandSub} onChange={(e) => setBrandSub(e.target.value)} placeholder="mis. by Studio Poonya" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Awal Kalimat Headline (sebelum kata yang berganti-ganti)
            </label>
            <Input value={taglinePrefix} onChange={(e) => setTaglinePrefix(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Subtitle</label>
            <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Label Tombol 1</label>
              <Input value={ctaBooking} onChange={(e) => setCtaBooking(e.target.value)} placeholder="mis. Booking Sekarang" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Label Tombol 2</label>
              <Input value={ctaPaket} onChange={(e) => setCtaPaket(e.target.value)} placeholder="mis. Lihat Paket" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="brand" className="rounded-full" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
            {saved ? <span className="text-xs text-emerald-600">Tersimpan.</span> : null}
          </div>
        </form>
      )}

      <div className="card-soft mt-6 max-w-xl space-y-4 p-6">
        <div>
          <h2 className="font-display text-lg text-foreground">Kata yang Berganti-ganti</h2>
          <p className="text-xs text-muted-foreground">
            Muncul di headline setelah "{taglinePrefix || "..."}", gonta-ganti otomatis (mis. Wedding, Birthday Party).
          </p>
        </div>

        <form onSubmit={handleAddWord} className="flex gap-2">
          <Input value={newWord} onChange={(e) => setNewWord(e.target.value)} placeholder="mis. Bridal Shower" />
          <Button type="submit" variant="brand" className="shrink-0 rounded-full">
            <Plus className="size-4" /> Tambah
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {wordsLoading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : words.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada kata.</p>
          ) : (
            words.map((w) => (
              <div key={w.id} className="flex items-center gap-2 rounded-full border border-border py-1.5 pr-1.5 pl-4">
                <span className="text-sm text-foreground">{w.word}</span>
                <button onClick={() => handleDeleteWord(w.id)} className="grid size-6 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
