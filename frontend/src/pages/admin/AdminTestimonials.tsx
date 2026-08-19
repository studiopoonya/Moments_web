import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { testimonialsApi, type TestimonialItem } from "@/lib/api";

const EMPTY = { name: "", handle: "", text: "", row: "1" };

export function AdminTestimonials() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await testimonialsApi.list(getAdminToken()!));
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

  function openEdit(item: TestimonialItem) {
    setEditingId(item.id);
    setForm({ name: item.name, handle: item.handle ?? "", text: item.text, row: String(item.row) });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("handle", form.handle);
      data.append("text", form.text);
      data.append("row", form.row);

      if (editingId) {
        await testimonialsApi.update(token, editingId, data);
      } else {
        await testimonialsApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan testimoni.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus testimoni ini?")) return;
    await testimonialsApi.remove(token, id);
    await load();
  }

  return (
    <AdminLayout title="Testimoni" subtitle="Kelola testimoni yang tampil di section Testimoni">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Testimoni
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Testimoni" : "Testimoni Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Nama</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Handle (mis. @nama)</label>
              <Input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Isi Testimoni</label>
            <Textarea required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Baris Marquee</label>
            <div className="flex gap-2">
              {["1", "2"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, row: r })}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    form.row === r ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                  }`}
                >
                  Baris {r}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="brand" className="rounded-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada testimoni.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card-soft p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.handle}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-primary">
                  Baris {item.row}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(item)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
