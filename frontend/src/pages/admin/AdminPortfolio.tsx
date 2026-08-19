import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminToken } from "@/lib/auth";
import { portfolioApi, type PortfolioItemT } from "@/lib/api";

export function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItemT[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [label, setLabel] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await portfolioApi.list(getAdminToken()!));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setLabel("");
    setImage(null);
    setFormOpen(true);
  }

  function openEdit(item: PortfolioItemT) {
    setEditingId(item.id);
    setLabel(item.label ?? "");
    setImage(null);
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    if (!editingId && !image) {
      alert("Foto wajib diisi untuk item baru.");
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("label", label);
      if (image) data.append("image", image);

      if (editingId) {
        await portfolioApi.update(token, editingId, data);
      } else {
        await portfolioApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan foto portfolio.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus foto ini?")) return;
    await portfolioApi.remove(token, id);
    await load();
  }

  const editingItem = items.find((i) => i.id === editingId) ?? null;

  return (
    <AdminLayout title="Portfolio" subtitle="Kelola foto yang tampil di section Portfolio">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Foto
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Foto" : "Foto Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <ImageUploadField
            label="Foto"
            required={!editingId}
            file={image}
            existingUrl={editingItem?.image_url}
            onChange={setImage}
            aspect="aspect-[4/5]"
          />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Keterangan (mis. nama acara)</label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="mis. The Wedding of Andika & Monic" />
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
          <p className="text-sm text-muted-foreground">Belum ada foto.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card-soft overflow-hidden">
              <div className="aspect-[4/5] bg-muted">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.label ?? ""} className="size-full object-cover" />
                ) : null}
              </div>
              <div className="p-3">
                <p className="truncate text-xs text-muted-foreground">{item.label || "—"}</p>
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
