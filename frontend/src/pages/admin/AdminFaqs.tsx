import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminToken } from "@/lib/auth";
import { faqsApi, type FaqItemT } from "@/lib/api";

const EMPTY = { question: "", answer: "" };

export function AdminFaqs() {
  const [items, setItems] = useState<FaqItemT[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await faqsApi.list(getAdminToken()!));
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

  function openEdit(item: FaqItemT) {
    setEditingId(item.id);
    setForm({ question: item.question, answer: item.answer });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("question", form.question);
      data.append("answer", form.answer);

      if (editingId) {
        await faqsApi.update(token, editingId, data);
      } else {
        await faqsApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan FAQ.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus FAQ ini?")) return;
    await faqsApi.remove(token, id);
    await load();
  }

  return (
    <AdminLayout title="FAQ" subtitle="Kelola pertanyaan & jawaban di section FAQ">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah FAQ
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit FAQ" : "FAQ Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Pertanyaan</label>
            <Input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Jawaban</label>
            <Textarea required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
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
          <p className="p-8 text-center text-sm text-muted-foreground">Belum ada FAQ.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 border-b border-border p-5 last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{item.question}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.answer}</p>
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
          ))
        )}
      </div>
    </AdminLayout>
  );
}
