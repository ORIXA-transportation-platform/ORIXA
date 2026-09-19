/**
 * ORIXA – App.jsx
 * ────────────────
 * Root router configuration.
 * All app routes are wrapped in AppLayout which provides the shared sidebar.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Shared Layout
import AppLayout from './components/user/AppLayout';

// Pages
import HomePage    from './Pages/homePage';
import JourneyPage from './Pages/journeyPage';
import LiveMapPage from './Pages/liveMapPage';
import ProfilePage from './Pages/profilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* App pages — each page receives AppLayout internally */}
        <Route path="/home"     element={<HomePage />} />
        <Route path="/journey"  element={<JourneyPage />} />
        <Route path="/live-map" element={<LiveMapPage />} />
        <Route path="/profile"  element={<ProfilePage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
