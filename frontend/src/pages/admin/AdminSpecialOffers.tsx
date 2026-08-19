import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminToken } from "@/lib/auth";
import { specialOffersApi, type SpecialOfferItem } from "@/lib/api";

export function AdminSpecialOffers() {
  const [items, setItems] = useState<SpecialOfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await specialOffersApi.list(getAdminToken()!));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setTitle("");
    setLinkUrl("");
    setImage(null);
    setFormOpen(true);
  }

  function openEdit(item: SpecialOfferItem) {
    setEditingId(item.id);
    setTitle(item.title ?? "");
    setLinkUrl(item.link_url ?? "");
    setImage(null);
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    if (!editingId && !image) {
      alert("Gambar promo wajib diisi.");
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("link_url", linkUrl);
      if (image) data.append("image", image);

      if (editingId) {
        await specialOffersApi.update(token, editingId, data);
      } else {
        await specialOffersApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan promo.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus promo ini?")) return;
    await specialOffersApi.remove(token, id);
    await load();
  }

  const editingItem = items.find((i) => i.id === editingId) ?? null;

  return (
    <AdminLayout title="Special Offer" subtitle="Kelola gambar promo yang tampil di section Promo Berjalan">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Promo
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Promo" : "Promo Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Special Offer tampil sebagai gambar poster utuh di landing page — upload desain promo yang sudah jadi (bukan teks terpisah).
          </p>

          <ImageUploadField
            label="Gambar Promo"
            required={!editingId}
            file={image}
            existingUrl={editingItem?.image_url}
            onChange={setImage}
            aspect="aspect-[3/4]"
          />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Judul (untuk admin saja, tidak tampil di web)</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="mis. Promo Akhir Tahun 2026" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Link Tujuan (opsional)</label>
            <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="#kontak atau URL lengkap" />
          </div>

          <Button type="submit" variant="brand" className="rounded-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada promo.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card-soft overflow-hidden">
              <div className="aspect-[3/4] bg-muted">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title ?? ""} className="size-full object-cover" />
                ) : null}
              </div>
              <div className="p-3">
                <p className="truncate text-xs text-muted-foreground">{item.title || "—"}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => openEdit(item)} className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                    <Pencil className="size-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
