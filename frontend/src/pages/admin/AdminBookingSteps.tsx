import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { IconPicker } from "@/components/admin/IconPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getIcon } from "@/lib/iconRegistry";
import { getAdminToken } from "@/lib/auth";
import { bookingStepsApi, type BookingStepT } from "@/lib/api";

const EMPTY = { icon: "CalendarCheck", title: "", text: "" };

export function AdminBookingSteps() {
  const [items, setItems] = useState<BookingStepT[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await bookingStepsApi.list(getAdminToken()!));
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

  function openEdit(item: BookingStepT) {
    setEditingId(item.id);
    setForm({ icon: item.icon, title: item.title, text: item.text ?? "" });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("icon", form.icon);
      data.append("title", form.title);
      data.append("text", form.text);

      if (editingId) {
        await bookingStepsApi.update(token, editingId, data);
      } else {
        data.append("sort_order", String(items.length));
        await bookingStepsApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus langkah ini?")) return;
    await bookingStepsApi.remove(token, id);
    await load();
  }

  return (
    <AdminLayout title="Cara Kerja" subtitle="Kelola langkah-langkah & ikon di section 'Cara Kerja'">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Langkah
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Langkah" : "Langkah Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Ikon</label>
            <IconPicker value={form.icon} onChange={(icon) => setForm({ ...form, icon })} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Judul</label>
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Deskripsi</label>
            <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </div>

          <Button type="submit" variant="brand" className="rounded-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      ) : null}

      <div className="card-soft mt-6 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-muted-foreground">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">Belum ada langkah.</p>
        ) : (
          items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.id} className="flex items-start justify-between gap-4 border-b border-border p-5 last:border-0">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-muted-foreground">{i + 1}.</span> {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(item)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
}
