import { useEffect, useState, type FormEvent } from "react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { popupSettingApi } from "@/lib/api";

export function AdminClaimOffer() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [delaySeconds, setDelaySeconds] = useState(3);
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [titleAccent, setTitleAccent] = useState("");
  const [description, setDescription] = useState("");
  const [consentText, setConsentText] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    popupSettingApi
      .get(token)
      .then((data) => {
        setEnabled(data.enabled);
        setDelaySeconds(data.delay_seconds);
        setBadge(data.badge ?? "");
        setTitle(data.title);
        setTitleAccent(data.title_accent ?? "");
        setDescription(data.description ?? "");
        setConsentText(data.consent_text ?? "");
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
      await popupSettingApi.update(token, {
        enabled,
        delay_seconds: delaySeconds,
        badge,
        title,
        title_accent: titleAccent,
        description,
        consent_text: consentText,
      });
      setSaved(true);
    } catch {
      alert("Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout
      title="Claim Offer"
      subtitle="Atur popup penawaran yang muncul otomatis di landing page"
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : (
        <form onSubmit={handleSubmit} className="card-soft max-w-xl space-y-5 p-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="size-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium text-foreground">Aktifkan popup Claim Offer</span>
          </label>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Muncul setelah (detik)</label>
            <Input
              type="number"
              min={0}
              max={60}
              value={delaySeconds}
              onChange={(e) => setDelaySeconds(Number(e.target.value))}
              className="max-w-32"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Badge</label>
            <Input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="mis. Penawaran Spesial 🎉" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Judul</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="mis. Claim Now & Get" required />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Judul (bagian ditonjolkan)</label>
              <Input value={titleAccent} onChange={(e) => setTitleAccent(e.target.value)} placeholder="mis. Diskon 15K!" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Deskripsi</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Isi data di bawah dan tim kami langsung follow-up via WhatsApp."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Teks Persetujuan (consent)</label>
            <Textarea
              value={consentText}
              onChange={(e) => setConsentText(e.target.value)}
              rows={2}
              placeholder="Dengan mengisi form ini, Anda setuju menerima komunikasi pemasaran via WhatsApp & email."
            />
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
