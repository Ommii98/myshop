/**
 * api.js – single source of truth for backend URL
 *
 * LOCAL DEV:
 *   Vite's dev-server proxy forwards /api/* → http://localhost:3000
 *   so VITE_API_BASE_URL is not needed; just use relative '/api' paths.
 *
 * PRODUCTION (Render experimentalServices):
 *   The backend is exposed at  /_/backend  by Render.
 *   Set VITE_API_BASE_URL=/_/backend  in your Render frontend env vars.
 *   All fetch calls become:  /_/backend/api/send-otp  etc.
 *
 *   If you run backend as a separate Render Web Service (recommended),
 *   set VITE_API_BASE_URL=https://your-backend.onrender.com
 */
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export const apiUrl = (path) => `${BASE}${path}`;
