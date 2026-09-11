import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  Award,
  Boxes,
  Building2,
  ExternalLink,
  GalleryHorizontal,
  Gift,
  HelpCircle,
  Image,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  MessageSquareQuote,
  Percent,
  Sparkles,
  Tag,
  X,
} from "lucide-react";

import { useAuth } from "@/lib/auth";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/hero", label: "Hero", icon: Image },
  { to: "/admin/about", label: "Tentang Produk", icon: Sparkles },
  { to: "/admin/products", label: "Product", icon: Boxes },
  { to: "/admin/why-us", label: "Kenapa Pilih Kami", icon: Award },
  { to: "/admin/booking-steps", label: "Cara Kerja", icon: ListChecks },
  { to: "/admin/packages", label: "Price Package", icon: Tag },
  { to: "/admin/clients", label: "Our Client", icon: Building2 },
  { to: "/admin/testimonials", label: "Testimoni", icon: MessageSquareQuote },
  { to: "/admin/portfolio", label: "Portfolio", icon: GalleryHorizontal },
  { to: "/admin/special-offers", label: "Special Offer", icon: Percent },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/claim-offer", label: "Claim Offer", icon: Gift },
];

export function AdminLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <p className="font-display text-xl text-foreground">Poonya Moments</p>
              <p className="text-[11px] tracking-[0.2em] text-primary/80 uppercase">Admin Panel</p>
            </div>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setMobileOpen(false)}
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[linear-gradient(135deg,var(--sky-brand),var(--deep-brand))] text-white shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <a
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="size-4" /> Lihat Website
            </a>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-muted/60 p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-display text-sm font-semibold text-primary">
                {user?.name?.[0] ?? "A"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button
                type="button"
                aria-label="Keluar"
                onClick={() => void logout()}
                className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen ? (
        <div
          aria-hidden
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card/95 px-5 py-4 backdrop-blur-sm sm:px-8">
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setMobileOpen(true)}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <div>
            <h1 className="font-display text-xl text-foreground">{title}</h1>
            {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
