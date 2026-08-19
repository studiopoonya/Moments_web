import { lazy, Suspense, type ComponentType } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Landing } from "@/pages/Landing";

// Code-split the admin panel — landing page visitors shouldn't pay for it.
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() =>
  import("@/pages/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AdminProducts = lazy(() =>
  import("@/pages/admin/AdminProducts").then((m) => ({ default: m.AdminProducts })),
);
const AdminPackages = lazy(() =>
  import("@/pages/admin/AdminPackages").then((m) => ({ default: m.AdminPackages })),
);
const AdminClients = lazy(() =>
  import("@/pages/admin/AdminClients").then((m) => ({ default: m.AdminClients })),
);
const AdminTestimonials = lazy(() =>
  import("@/pages/admin/AdminTestimonials").then((m) => ({ default: m.AdminTestimonials })),
);
const AdminPortfolio = lazy(() =>
  import("@/pages/admin/AdminPortfolio").then((m) => ({ default: m.AdminPortfolio })),
);
const AdminSpecialOffers = lazy(() =>
  import("@/pages/admin/AdminSpecialOffers").then((m) => ({ default: m.AdminSpecialOffers })),
);
const AdminFaqs = lazy(() => import("@/pages/admin/AdminFaqs").then((m) => ({ default: m.AdminFaqs })));
const AdminClaimOffer = lazy(() =>
  import("@/pages/admin/AdminClaimOffer").then((m) => ({ default: m.AdminClaimOffer })),
);

function AdminFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/40">
      <p className="text-sm text-muted-foreground">Memuat...</p>
    </div>
  );
}

function protectedPage(Component: ComponentType) {
  return (
    <Suspense fallback={<AdminFallback />}>
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route path="/admin" element={protectedPage(AdminDashboard)} />
          <Route path="/admin/products" element={protectedPage(AdminProducts)} />
          <Route path="/admin/packages" element={protectedPage(AdminPackages)} />
          <Route path="/admin/clients" element={protectedPage(AdminClients)} />
          <Route path="/admin/testimonials" element={protectedPage(AdminTestimonials)} />
          <Route path="/admin/portfolio" element={protectedPage(AdminPortfolio)} />
          <Route path="/admin/special-offers" element={protectedPage(AdminSpecialOffers)} />
          <Route path="/admin/faqs" element={protectedPage(AdminFaqs)} />
          <Route path="/admin/claim-offer" element={protectedPage(AdminClaimOffer)} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
