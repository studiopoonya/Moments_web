import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Mail, MessageCircle, MessageSquare, RefreshCw, Search, Trash2, Users } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminToken } from "@/lib/auth";
import { deleteLead, fetchLeads, waClickApi, type Lead, type LeadSource } from "@/lib/api";

const SOURCE_LABEL: Record<LeadSource, string> = {
  contact_form: "Contact Form",
  promo_popup: "Promo Popup",
};

const SOURCE_BADGE: Record<LeadSource, string> = {
  contact_form: "bg-sky-100 text-sky-600",
  promo_popup: "bg-amber-100 text-amber-600",
};

type SourceFilter = "all" | LeadSource;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-rose-400",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-teal-500",
];

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<SourceFilter>("all");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [waClicks, setWaClicks] = useState(0);

  async function load() {
    const token = getAdminToken();
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await fetchLeads(token);
      setLeads(data);
    } catch {
      setError("Gagal memuat data leads.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
    const token = getAdminToken();
    if (token) waClickApi.count(token).then(setWaClicks).catch(() => undefined);
  }, []);

  async function handleDelete(id: number) {
    const token = getAdminToken();
    if (!token) return;
    if (!confirm("Hapus lead ini?")) return;
    setDeletingId(id);
    try {
      await deleteLead(token, id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      alert("Gagal menghapus lead.");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.source !== filter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, filter, search]);

  const stats = useMemo(() => {
    const total = leads.length;
    const contact = leads.filter((l) => l.source === "contact_form").length;
    const promo = leads.filter((l) => l.source === "promo_popup").length;
    const today = leads.filter((l) => {
      const d = new Date(l.created_at);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length;
    return { total, contact, promo, today };
  }, [leads]);

  const statCards = [
    { label: "Total Leads", value: stats.total, icon: Users, chip: "bg-accent", iconColor: "text-primary" },
    { label: "Dari Contact Form", value: stats.contact, icon: Mail, chip: "bg-sky-100", iconColor: "text-sky-600" },
    { label: "Dari Promo Popup", value: stats.promo, icon: MessageSquare, chip: "bg-amber-100", iconColor: "text-amber-600" },
    { label: "Masuk Hari Ini", value: stats.today, icon: RefreshCw, chip: "bg-emerald-100", iconColor: "text-emerald-600" },
    { label: "Klik Tombol WhatsApp", value: waClicks, icon: MessageCircle, chip: "bg-teal-100", iconColor: "text-teal-600" },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Pantau leads yang masuk dari website Poonya Moments">
      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {statCards.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -3 }}
            className="card-soft p-5 hover:shadow-md"
          >
            <span className={`grid size-10 place-items-center rounded-xl ${s.chip}`}>
              <s.icon className={`size-5 ${s.iconColor}`} />
            </span>
            <p className="mt-4 font-display text-3xl text-foreground">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
          {(["all", "contact_form", "promo_popup"] as SourceFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Semua" : SOURCE_LABEL[f]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => void load()}>
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="card-soft mt-4 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-accent">
              <RefreshCw className="size-4 animate-spin text-primary" />
            </span>
            <p className="text-sm text-muted-foreground">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <p className="text-sm text-red-500">{error}</p>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => void load()}>
              Coba Lagi
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-accent">
              <Inbox className="size-5 text-primary" />
            </span>
            <p className="text-sm text-muted-foreground">
              {leads.length === 0 ? "Belum ada leads yang masuk." : "Tidak ada hasil yang cocok."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Nama</th>
                  <th className="px-5 py-3 font-medium">Kontak</th>
                  <th className="px-5 py-3 font-medium">Sumber</th>
                  <th className="px-5 py-3 font-medium">Pesan</th>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                        >
                          {initials(lead.name)}
                        </span>
                        <span className="font-medium text-foreground">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {lead.phone ? <p>{lead.phone}</p> : null}
                      {lead.email ? <p>{lead.email}</p> : null}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${SOURCE_BADGE[lead.source]}`}>
                        {SOURCE_LABEL[lead.source]}
                      </span>
                    </td>
                    <td className="max-w-64 truncate px-5 py-3 text-muted-foreground">
                      {lead.subject ? <span className="font-medium text-foreground">{lead.subject}: </span> : null}
                      {lead.message ?? "—"}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">{formatDate(lead.created_at)}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        aria-label="Hapus"
                        disabled={deletingId === lead.id}
                        onClick={() => handleDelete(lead.id)}
                        className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
