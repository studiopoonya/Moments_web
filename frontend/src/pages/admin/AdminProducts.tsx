import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { productsApi, type Product } from "@/lib/api";

const EMPTY = { badge: "", name: "", description: "", tags: "" };

export function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await productsApi.list(getAdminToken()!));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setImage(null);
    setFormOpen(true);
  }

  function openEdit(item: Product) {
    setEditingId(item.id);
    setForm({ badge: item.badge, name: item.name, description: item.description, tags: item.tags.join(", ") });
    setImage(null);
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("badge", form.badge);
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("tags", form.tags);
      if (image) data.append("image", image);

      if (editingId) {
        await productsApi.update(token, editingId, data);
      } else {
        await productsApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan produk.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus produk ini?")) return;
    await productsApi.remove(token, id);
    await load();
  }

  const editingItem = items.find((i) => i.id === editingId) ?? null;

  return (
    <AdminLayout title="Product" subtitle="Kelola produk yang tampil di section Product Showcase">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Produk
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">
              {editingId ? "Edit Produk" : "Produk Baru"}
            </h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <ImageUploadField
            label="Foto Produk"
            file={image}
            existingUrl={editingItem?.image_url}
            onChange={setImage}
            aspect="aspect-[4/5]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Badge / Kategori</label>
              <Input required value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="mis. AI Photobooth" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Nama Produk</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Deskripsi</label>
            <Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Tags (pisahkan dengan koma)</label>
            <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Unlimited Print, Ring Light Custom" />
          </div>

          <Button type="submit" variant="brand" className="rounded-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada produk.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card-soft overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="size-full object-cover" />
                ) : (
                  <div className="grid size-full place-items-center text-xs text-muted-foreground">Belum ada foto</div>
                )}
              </div>
              <div className="p-4">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
                  {item.badge}
                </span>
                <h3 className="mt-2 font-display text-lg text-foreground">{item.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(item)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
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
