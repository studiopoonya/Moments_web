import { useEffect, useState, type FormEvent } from "react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { aboutSettingApi } from "@/lib/api";

export function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    aboutSettingApi
      .get(token)
      .then((data) => {
        setEyebrow(data.eyebrow ?? "");
        setTitle(data.title);
        setBody(data.body ?? "");
        setQuote(data.quote ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setSaved(false);
    try {
      await aboutSettingApi.update(token, { eyebrow, title, body, quote });
      setSaved(true);
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title="Tentang Produk" subtitle="Kelola isi section 'Tentang Produk' di landing page">
      {loading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : (
        <form onSubmit={handleSubmit} className="card-soft max-w-xl space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Eyebrow</label>
            <Input value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} placeholder="mis. Tentang Produk" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Judul</label>
            <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Deskripsi</label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Kutipan (italic, di bawah deskripsi)</label>
            <Input value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="mis. Premium quality, at an affordable price." />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="brand" className="rounded-full" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
            {saved ? <span className="text-xs text-emerald-600">Tersimpan.</span> : null}
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
