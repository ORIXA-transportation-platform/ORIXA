# ORIXA
Futuristic transportation platform- Transportation 2100.

## Getting Started

The app lives in `frontend/` (React 19 + Vite 8 + Tailwind CSS v4).

```bash
cd frontend
npm install      # only needed the first time
npm run dev      # start dev server -> http://localhost:5173
```

Other scripts (run from `frontend/`):

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                            |
| `npm run build`   | Production build into `frontend/dist`               |
| `npm run preview` | Serve the built `dist` bundle locally               |
| `npm run lint`    | Run ESLint                                          |

### Routes

`/` redirects to `/home`; the other pages are `/journey`, `/live-map`, and `/profile`
(configured in `frontend/src/App.jsx`).

