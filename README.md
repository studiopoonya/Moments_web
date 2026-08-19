# Poonya Moments

Landing page for Poonya Moments — premium photobooth rental for events (wedding, birthday, corporate, community, exhibition).

Monorepo split into two independent projects:

- **`frontend/`** — React 19 + Vite SPA (TypeScript, Tailwind CSS v4, Framer Motion, React Router). The public landing page, plus an admin panel at `/admin`.
- **`backend/`** — Laravel 12 API (MySQL, Sanctum token auth). Public routes for the landing page's forms, plus token-protected `/api/admin/*` routes for the dashboard.

## Admin panel

- `http://localhost:5173/admin/login` — log in with the seeded admin account below.
- `http://localhost:5173/admin` — dashboard listing every lead submitted through the landing page (Contact Us form + the 5-second promo popup), with search, a source filter, and delete.

Seeded placeholder admin login (change the password after your first login — there's no "change password" UI yet, use `php artisan tinker` or update it directly):

```
email:    admin@poonyamoments.id
password: poonya123
```

Re-seed anytime with `php artisan db:seed --class=AdminUserSeeder` (safe to re-run, it upserts by email).

Auth is Sanctum personal-access-tokens (a bearer token returned on login, stored in the browser's `localStorage`, sent as `Authorization: Bearer …`) — not cookie/session based, so it works cleanly across the frontend's 5173 and backend's 8001 ports without CORS/CSRF cookie configuration.

## Development

Run both servers in separate terminals. **Note:** port 8000 is already used by another project ("Capture Moments") on this machine, so the backend runs on **8001** instead.

```sh
# Terminal 1 — backend (http://localhost:8001)
cd backend
php artisan serve

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm install   # first time only
npm run dev
```

`backend/.env` sets `SERVER_PORT=8001`, so plain `php artisan serve` (no `--port` flag needed) already binds to 8001 instead of Laravel's usual 8000.

The frontend's Vite dev server proxies `/api/*` requests to `http://localhost:8001` (see `frontend/vite.config.ts`), so frontend code can just call relative paths like `fetch("/api/health")`.

## Production build

```sh
cd frontend
npm run build
```

Outputs a static bundle to `frontend/dist/`. Point Laravel's `public/` folder at it (or serve it separately) depending on how you deploy.

**Note:** the app now uses client-side routing (`/admin/login`, `/admin`) via React Router. The Vite dev server handles this automatically, but a production static host needs a SPA-fallback rewrite rule (serve `index.html` for any path that isn't a real file) or a direct link to `/admin` will 404. Most static hosts (Netlify, Vercel, Nginx `try_files`) support this with one config line — ask if you want that wired up for your specific host.

## Content still using placeholders

- Product photos (hero + showcase sections use an empty "Product Image Slot")
- WhatsApp number, email, Instagram handle
- Studio address & map pin (Contact section)
- Package pricing (example numbers from the brand guideline)
- Testimonials (example quotes, not real customer reviews yet)

All marked clearly in the relevant component files under `frontend/src/components/poonya/` and `frontend/src/App.tsx` — easy to find and swap once real assets/info are available.
