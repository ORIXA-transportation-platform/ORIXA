/**
 * ORIXA – App.jsx
 * ────────────────
 * Root router configuration.
 * All app routes are wrapped in AppLayout which provides the shared sidebar.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage    from './Pages/homePage';
import JourneyPage from './Pages/journeyPage';
import LiveMapPage from './Pages/liveMapPage';
import ProfilePage from './Pages/profilePage';
import LoginPage    from './Pages/loginPage';
import SignupPage   from './Pages/signupPage';
import LandingPage from './Pages/landingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth pages — no sidebar */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

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