/**
 * ORIXA – App.jsx
 * ────────────────
 * Root router configuration.
 * • Public routes  – landing, login (no sidebar)
 * • User routes    – home, journey, live-map, profile (with sidebar via UserLayout)
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Navigation & Layout
import SideNavbar from './components/user/sideNavbar';

// Pages
import HomePage     from './Pages/homePage';
import JourneyPage  from './Pages/journeyPage';
import LiveMapPage  from './Pages/liveMapPage';
import ProfilePage  from './Pages/profilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Redirect root to /home ───────────────────────────── */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ── Public Route (Standalone) ───────────────────────── */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/live-map" element={<LiveMapPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* ── User / authenticated area (unified SideNavbar layout) ─ */}
        <Route element={<SideNavbar />}>
        </Route>

        {/* ── Catch-all fallback ───────────────────────────────── */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
