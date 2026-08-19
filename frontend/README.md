# Poonya Moments — Frontend

React + Vite SPA for the Poonya Moments landing page. Talks to the Laravel API in `../backend`.

## Development

```sh
npm install
npm run dev
```

Runs on `http://localhost:5173`. Requests to `/api/*` are proxied to the Laravel backend at `http://localhost:8001` (see `vite.config.ts`) — start the backend with `php artisan serve --port=8001` from `../backend` (port 8000 is used by another project on this machine).

## Build

```sh
npm run build
```

Outputs a static bundle to `dist/`, which can be served by Laravel's `public/` folder or any static host.
