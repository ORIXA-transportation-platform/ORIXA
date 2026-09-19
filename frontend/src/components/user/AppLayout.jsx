/**
 * ORIXA – AppLayout
 * ─────────────────
 * Shared layout wrapper that provides:
 *  • The consistent CSS-class sidebar (matching all existing page styles)
 *  • Mobile hamburger + slide-over drawer + backdrop overlay
 *  • Proper active-nav highlighting via React Router's useLocation
 *
 * Each page simply wraps its content in <AppLayout> — no duplication needed.
 *
 * @file src/components/user/AppLayout.jsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X, ArrowRight } from 'lucide-react';

/* ───────────── NAV CONFIG ───────────── */
const NAV_ITEMS = [
  {
    label: 'Home',
    path: '/home',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    label: 'Journey',
    path: '/journey',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="5" r="2" />
        <path d="M7 19c6 0 4-10 10-14" />
      </svg>
    ),
  },
  {
    label: 'Live Map',
    path: '/live-map',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
      </svg>
    ),
  },
];

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevOverflow = useRef('');

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (isMenuOpen) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow.current;
    }
    return () => { document.body.style.overflow = prevOverflow.current; };
  }, [isMenuOpen]);

  /* Close on route change */
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  /* Close on Escape */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  const SidebarContent = ({ onLinkClick }) => (
    <>
      <div className="brand">
        <img src="/images/logo.png" alt="ORIXA Logo" className="brand-icon-img" />
      </div>
      <nav className="nav-menu" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, path, icon }) => (
          <Link
            key={path}
            to={path}
            aria-label={label}
            className={`nav-item ${pathname === path || (path !== '/home' && pathname.startsWith(path)) ? 'active' : ''}`}
            onClick={onLinkClick}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div
        className="ai-assistant-mini"
        role="button"
        tabIndex={0}
        aria-label="Open AI Travel Assistant"
        onClick={() => { if (onLinkClick) onLinkClick(); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { if (onLinkClick) onLinkClick(); } }}
      >
        <img src="/images/ai_robot.png" alt="AI Robot" style={{ objectFit: 'cover' }} />
        <div className="ai-mini-text">
          <strong>AI Travel Assistant</strong>
          <small>Always here to help</small>
        </div>
        <ArrowRight size={14} className="ai-mini-arrow" />
      </div>
    </>
  );

  return (
    <div className="app-container">
      {/* ── MOBILE OVERLAY BACKDROP ── */}
      <div
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── DESKTOP / TABLET SIDEBAR ── */}
      <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
        <SidebarContent onLinkClick={null} />
      </aside>

      {/* ── MOBILE HAMBURGER BUTTON (fixed top-left) ── */}
      <button
        type="button"
        className="mobile-menu-btn app-layout-hamburger"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
      >
        <Menu size={22} />
      </button>

      {/* ── MAIN CONTENT ── */}
      <div className="app-layout-main">
        {children}
      </div>
    </div>
  );
}
