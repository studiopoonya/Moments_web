export const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export type LeadSource = "contact_form" | "promo_popup";

export type LeadPayload = {
  source: LeadSource;
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Gagal mengirim data (${res.status})`);
  }
}

export type Lead = {
  id: number;
  source: LeadSource;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  created_at: string;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
};

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJsonOrThrow(res: Response) {
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const message = body?.message ?? `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  return body;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseJsonOrThrow(res) as Promise<{ token: string; user: AdminUser }>;
}

export async function adminLogout(token: string) {
  await fetch(`${API_BASE}/admin/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  }).catch(() => undefined);
}

export async function adminMe(token: string) {
  const res = await fetch(`${API_BASE}/admin/me`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  return parseJsonOrThrow(res) as Promise<{ user: AdminUser }>;
}

export async function fetchLeads(token: string) {
  const res = await fetch(`${API_BASE}/admin/leads`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  return parseJsonOrThrow(res) as Promise<{ data: Lead[] }>;
}

export async function deleteLead(token: string, id: number) {
  const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new ApiError(`Gagal menghapus (${res.status})`, res.status);
  }
}

// ---------------------------------------------------------------------------
// Site content (products, packages, clients, testimonials, portfolio,
// special offers, FAQ) — the same shape backs both the public landing page
// (read-only) and the admin CRUD pages.

export type Product = {
  id: number;
  badge: string;
  name: string;
  description: string;
  tags: string[];
  image_url: string | null;
  sort_order: number;
};

export type Package = {
  id: number;
  emoji: string | null;
  name: string;
  meta: string | null;
  price: string;
  description: string | null;
  highlight: boolean;
  sort_order: number;
};

export type ClientItem = {
  id: number;
  name: string;
  logo_url: string | null;
  sort_order: number;
};

export type TestimonialItem = {
  id: number;
  name: string;
  handle: string | null;
  text: string;
  row: number;
  sort_order: number;
};

export type PortfolioItemT = {
  id: number;
  image_url: string | null;
  label: string | null;
  sort_order: number;
};

export type SpecialOfferItem = {
  id: number;
  image_url: string | null;
  title: string | null;
  link_url: string | null;
  sort_order: number;
};

export type FaqItemT = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export type PopupSettingT = {
  id: number;
  enabled: boolean;
  delay_seconds: number;
  badge: string | null;
  title: string;
  title_accent: string | null;
  description: string | null;
  consent_text: string | null;
};

export async function fetchPublic<T>(path: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } });
  const body = await parseJsonOrThrow(res);
  return body.data;
}

export async function fetchPublicOne<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } });
  const body = await parseJsonOrThrow(res);
  return body.data;
}

export async function fetchAdminList<T>(token: string, path: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  const body = await parseJsonOrThrow(res);
  return body.data;
}

export async function adminSubmit<T>(token: string, path: string, form: FormData): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    body: form,
  });
  const body = await parseJsonOrThrow(res);
  return body.data;
}

export async function adminDelete(token: string, path: string): Promise<void> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new ApiError(`Gagal menghapus (${res.status})`, res.status);
  }
}

function resource<T>(publicPath: string | null, adminPath: string) {
  return {
    listPublic: publicPath ? () => fetchPublic<T>(publicPath) : undefined,
    list: (token: string) => fetchAdminList<T>(token, adminPath),
    create: (token: string, form: FormData) => adminSubmit<T>(token, adminPath, form),
    update: (token: string, id: number, form: FormData) => {
      form.append("_method", "PUT");
      return adminSubmit<T>(token, `${adminPath}/${id}`, form);
    },
    remove: (token: string, id: number) => adminDelete(token, `${adminPath}/${id}`),
  };
}

export const productsApi = resource<Product>("/products", "/admin/products");
export const packagesApi = resource<Package>("/packages", "/admin/packages");
export const clientsApi = resource<ClientItem>("/clients", "/admin/clients");
export const testimonialsApi = resource<TestimonialItem>("/testimonials", "/admin/testimonials");
export const portfolioApi = resource<PortfolioItemT>("/portfolio", "/admin/portfolio");
export const specialOffersApi = resource<SpecialOfferItem>("/special-offers", "/admin/special-offers");
export const faqsApi = resource<FaqItemT>("/faqs", "/admin/faqs");

export const popupSettingApi = {
  getPublic: () => fetchPublicOne<PopupSettingT>("/popup-settings"),
  get: async (token: string): Promise<PopupSettingT> => {
    const res = await fetch(`${API_BASE}/admin/popup-settings`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    const body = await parseJsonOrThrow(res);
    return body.data;
  },
  update: async (token: string, data: Record<string, string | number | boolean>): Promise<PopupSettingT> => {
    const res = await fetch(`${API_BASE}/admin/popup-settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await parseJsonOrThrow(res);
    return body.data;
  },
};
