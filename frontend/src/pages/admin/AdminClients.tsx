import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminToken } from "@/lib/auth";
import { clientsApi, type ClientItem } from "@/lib/api";

export function AdminClients() {
  const [items, setItems] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await clientsApi.list(getAdminToken()!));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setName("");
    setLogo(null);
    setFormOpen(true);
  }

  function openEdit(item: ClientItem) {
    setEditingId(item.id);
    setName(item.name);
    setLogo(null);
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", name);
      if (logo) data.append("logo", logo);

      if (editingId) {
        await clientsApi.update(token, editingId, data);
      } else {
        await clientsApi.create(token, data);
      }
      setFormOpen(false);
      await load();
    } catch {
      alert("Gagal menyimpan klien.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("Hapus klien ini?")) return;
    await clientsApi.remove(token, id);
    await load();
  }

  const editingItem = items.find((i) => i.id === editingId) ?? null;

  return (
    <AdminLayout title="Our Client" subtitle="Kelola brand/klien yang tampil di section Our Clients">
      <div className="flex justify-end">
        <Button variant="brand" className="rounded-full" onClick={openCreate}>
          <Plus className="size-4" /> Tambah Klien
        </Button>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit} className="card-soft mt-4 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">{editingId ? "Edit Klien" : "Klien Baru"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <ImageUploadField label="Logo (opsional)" file={logo} existingUrl={editingItem?.logo_url} onChange={setLogo} />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Nama Brand</label>
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="mis. Bridestory Market" />
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
          <p className="text-sm text-muted-foreground">Belum ada klien.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card-soft flex flex-col items-center gap-3 p-5 text-center">
              <span className="grid size-14 place-items-center overflow-hidden rounded-full bg-accent font-display text-lg font-semibold text-primary">
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.name} className="size-full object-cover" />
                ) : (
                  item.name[0]
                )}
              </span>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary">
                  <Pencil className="size-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
