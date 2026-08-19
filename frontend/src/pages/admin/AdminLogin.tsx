import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

export function AdminLogin() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="brand-surface relative flex min-h-screen items-center justify-center px-5 py-12">
      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold tracking-wide text-white">Poonya Moments</p>
          <p className="mt-1 text-[11px] italic tracking-[0.28em] text-cream/85 uppercase">Admin Panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-soft mt-8 space-y-4 p-7 sm:p-8"
        >
          <div>
            <h1 className="font-display text-xl text-foreground">Masuk ke Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Khusus untuk tim Poonya Moments.</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                required
                type="email"
                autoComplete="username"
                placeholder="admin@poonyamoments.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                required
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <Button type="submit" variant="brand" size="lg" disabled={submitting} className="w-full rounded-full">
            {submitting ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-white/60">
          <a href="/" className="hover:text-white">
            ← Kembali ke halaman utama
          </a>
        </p>
      </div>
    </div>
  );
}
