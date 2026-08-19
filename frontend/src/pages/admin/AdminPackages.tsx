import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { packagesApi, type Package } from "@/lib/api";

const EMPTY = { emoji: "", name: "", meta: "", price: "", description: "", highlight: false };

export function AdminPackages() {
  const [items, setItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await packagesApi.list(getAdminToken()!));
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
    setFormOpen(true);
  }

  function openEdit(item: Package) {
    setEditingId(item.id);
    setForm({
      emoji: item.emoji ?? "",
      name: item.name,
      meta: item.meta ?? "",
      price: item.price,
      description: item.description ?? "",
      highlight: item.highlight,
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("emoji", form.emoji);
      data.append("name", form.name);
      data.append("meta", form.meta);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("highlight", form.highlight ? "1" : "0");

      if (editingId) {
        await packagesApi.update(token, editingId, data);
      } else {
        await packagesApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan paket.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus paket ini?")) return;
    await packagesApi.remove(token, id);
    await load();
  }

  return (
    <AdminLayout title="Price Package" subtitle="Kelola paket harga yang tampil di section Pricing">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Paket
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Paket" : "Paket Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Emoji</label>
              <Input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="⭐" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-foreground">Nama Paket</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Meta (mis. "3 Jam · Cetak 2R")</label>
              <Input value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Harga</label>
              <Input required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Rp2.299.000 atau Contact Us" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Deskripsi Singkat</label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
              className="size-4 rounded border-border"
            />
            Tandai sebagai "Paling Diminati" (TERLARIS)
          </label>

          <Button type="submit" variant="brand" className="rounded-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      ) : null}

      <div className="card-soft mt-6 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-muted-foreground">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">Belum ada paket.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Paket</th>
                <th className="px-5 py-3 font-medium">Harga</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">
                      {item.emoji} {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.meta}</p>
                  </td>
                  <td className="px-5 py-3 font-medium text-foreground">{item.price}</td>
                  <td className="px-5 py-3">
                    {item.highlight ? (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-primary">Terlaris</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
