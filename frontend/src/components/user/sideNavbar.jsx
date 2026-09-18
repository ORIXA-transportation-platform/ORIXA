/**
 * ORIXA – SideNavbar
 * ──────────────────
 * High-fidelity futuristic smart-city navigation & layout component.
 * 
 * Responsibilities:
 *  - Desktop (lg+, 1024px+): Spacious 192px sticky sidebar with brand mark,
 *    subtitles, balanced navigation links, live city grid telemetry status,
 *    and AI Assistant launcher.
 *  - Tablet (md to lg, 768px–1023px): 72px compact rail with centered accessible
 *    icons and status indicator, maximizing canvas area for content.
 *  - Mobile (<md, <768px): Responsive slide-over drawer with backdrop blur,
 *    accessible floating hamburger trigger, and escape/click-outside dismissal.
 *  - Layout container: Wraps page content (<Outlet /> or children) in a flexible,
 *    full-height main canvas with zero horizontal overflow.
 *
 * @file src/components/user/sideNavbar.jsx
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Home,
  Route,
  MapPin,
  User,
  ChevronRight,
  Menu,
  X,
  Bot,
  Activity,
  Wifi,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   NAVIGATION CONFIGURATION
   ───────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Home',     path: '/home',     icon: Home   },
  { label: 'Journey',  path: '/journey',  icon: Route  },
  { label: 'Live Map', path: '/live-map', icon: MapPin },
  { label: 'Profile',  path: '/profile',  icon: User   },
];

/* ─────────────────────────────────────────────────────────────────────────
   BRAND LOGO MARK
   ───────────────────────────────────────────────────────────────────────── */
function LogoMark({ showLabelAlways = false }) {
  return (
    <div
      className={`flex items-center select-none gap-3 pt-6 pb-5 ${
        showLabelAlways ? 'px-4' : 'justify-center lg:justify-start px-2.5 lg:px-4'
      }`}
    >
      {/* Glowing holographic brand orb */}
      <div
        className="orb-pulse relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #5CE1FF 0%, #0072E5 45%, #04122A 100%)',
        }}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 flex items-center justify-center text-white font-bold select-none pointer-events-none"
          style={{ fontSize: 11, lineHeight: 1 }}
        >
          ✦
        </span>
      </div>

      {/* Brand wordmark + subtitle */}
      <div className={`${showLabelAlways ? 'flex' : 'hidden lg:flex'} flex-col leading-tight`}>
        <span className="text-white font-bold tracking-[0.22em] text-[13px] uppercase">
          ORIXA
        </span>
        <span className="text-[9.5px] text-[#4E76A4] tracking-[0.16em] uppercase font-medium mt-0.5">
          Mobility 2100
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SUBTLE DIVIDER
   ───────────────────────────────────────────────────────────────────────── */
function Divider({ compact = false }) {
  return (
    <div
      className={`mb-3 mt-0 h-px transition-all ${
        compact ? 'mx-2 lg:mx-3.5' : 'mx-3.5'
      }`}
      style={{ background: 'rgba(0, 180, 255, 0.12)' }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   NAVIGATION ITEM
   ───────────────────────────────────────────────────────────────────────── */
function NavItem({ item, onClick, showLabelAlways = false }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      aria-label={item.label}
      title={item.label}
      className={({ isActive }) =>
        [
          'relative group flex items-center gap-3',
          showLabelAlways
            ? 'mx-2.5 px-3.5 py-2.5'
            : 'mx-2 lg:mx-2.5 px-2.5 lg:px-3.5 py-2.5 justify-center lg:justify-start',
          'rounded-xl text-[13px] font-medium leading-none',
          'nav-focus cursor-pointer transition-all duration-200',
          isActive
            ? 'nav-active-bg text-white shadow-[0_0_15px_rgba(0,180,255,0.18)]'
            : 'text-[#50729B] hover:bg-[rgba(0,72,170,0.22)] hover:text-[#C4E0FF]',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator bar */}
          {isActive && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          <span
            className={[
              'flex-shrink-0 flex items-center justify-center w-5',
              'transition-colors duration-200',
              isActive
                ? 'text-[#00D4FF]'
                : 'text-[#41668E] group-hover:text-[#00D4FF]',
            ].join(' ')}
          >
            <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
          </span>

          {/* Label */}
          <span
            className={`${
              showLabelAlways ? 'inline' : 'hidden lg:inline'
            } flex-1 leading-none tracking-wide truncate`}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CITY GRID TELEMETRY STATUS (Fills vertical middle elegantly)
   ───────────────────────────────────────────────────────────────────────── */
function CityGridStatus({ showLabelAlways = false }) {
  return (
    <div className={`my-4 ${showLabelAlways ? 'px-3' : 'px-2 lg:px-3'}`}>
      {/* Full telemetry card on desktop and mobile drawer */}
      <div
        className={`${
          showLabelAlways ? 'block' : 'hidden lg:block'
        } p-3 rounded-2xl bg-[rgba(8,26,58,0.60)] border border-[rgba(0,180,255,0.14)] backdrop-blur-md shadow-sm`}
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B90BC]">
            Grid Telemetry
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        <div className="space-y-1.5 mt-2 text-[10.5px]">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-[#5D80AA]">
              <Activity size={11} className="text-cyan-400" />
              Transit Grid
            </span>
            <span className="font-semibold text-emerald-400">Optimal</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-[#5D80AA]">
              <Wifi size={11} className="text-cyan-400" />
              Hyper-Rail
            </span>
            <span className="text-cyan-300 font-medium">99.8% Sync</span>
          </div>
        </div>
      </div>

      {/* Compact tablet pill indicator */}
      <div
        className={`${
          showLabelAlways ? 'hidden' : 'flex lg:hidden'
        } justify-center items-center py-2`}
        title="Grid Telemetry: 100% Operational"
      >
        <div className="w-8 h-8 rounded-xl bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 transition-colors">
          <Activity size={14} className="text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   AI TRAVEL ASSISTANT CARD / BUTTON
   ───────────────────────────────────────────────────────────────────────── */
function AIAssistantCard({ showLabelAlways = false }) {
  return (
    <div className={`pb-6 ${showLabelAlways ? 'px-3' : 'px-2 lg:px-3'}`}>
      <button
        type="button"
        aria-label="Open AI Travel Assistant"
        title="AI Travel Assistant"
        className={[
          'group nav-focus w-full flex items-center gap-2.5',
          showLabelAlways
            ? 'p-3 justify-start'
            : 'p-2 lg:p-3 justify-center lg:justify-start',
          'rounded-2xl cursor-pointer text-left',
          'border border-[rgba(0,160,220,0.18)] transition-all duration-250',
          'hover:border-[rgba(0,212,255,0.40)] hover:bg-[rgba(0,60,140,0.28)]',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(145deg, rgba(8,26,58,0.96) 0%, rgba(5,16,38,0.98) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow:
            '0 0 0 1px rgba(0,180,255,0.06) inset, 0 4px 14px rgba(0,0,0,0.35)',
        }}
      >
        {/* Holographic AI orb */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_14px_3px_rgba(0,212,255,0.30)]"
          style={{
            background:
              'radial-gradient(circle at 38% 32%, rgba(0,212,255,0.95) 0%, rgba(70,50,190,0.75) 52%, rgba(5,16,38,0.90) 100%)',
            boxShadow: '0 0 8px 2px rgba(0,180,255,0.20)',
          }}
          aria-hidden="true"
        >
          <Bot size={15} className="text-white" strokeWidth={2} />
        </div>

        {/* Text descriptions */}
        <div className={`${showLabelAlways ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}>
          <p className="text-[11.5px] font-semibold text-[#B8D4F0] leading-snug truncate group-hover:text-white transition-colors duration-200">
            AI Assistant
          </p>
          <p className="text-[9.5px] text-[#486B91] leading-snug mt-0.5 truncate">
            Always ready
          </p>
        </div>

        <ChevronRight
          size={13}
          className={`${
            showLabelAlways ? 'block' : 'hidden lg:block'
          } flex-shrink-0 text-[#305072] group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all duration-200`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DESKTOP & TABLET SIDEBAR
   - Tablet (md to lg): 72px compact rail with centered icons
   - Desktop (lg+): 192px full sidebar with labels, telemetry, & card
   ───────────────────────────────────────────────────────────────────────── */
function DesktopSidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className={`
        sidebar-scroll sidebar-outer-glow
        hidden md:flex flex-col justify-between flex-shrink-0
        sticky top-0 h-screen z-40
        overflow-y-auto overflow-x-hidden
        w-[72px] lg:w-[192px] transition-[width] duration-300
      `}
      style={{
        background:
          'linear-gradient(180deg, #071A3A 0%, #061530 50%, #050F24 100%)',
        borderRight: '1px solid rgba(0, 160, 220, 0.15)',
      }}
    >
      <div>
        <LogoMark />
        <Divider compact />

        <span className="hidden lg:block px-4 mb-2 text-[9px] font-semibold tracking-[0.20em] text-[#335982] uppercase select-none">
          Navigation
        </span>

        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Middle Telemetry Widget - gracefully centered */}
      <div className="my-auto py-2">
        <CityGridStatus />
      </div>

      {/* Bottom AI Assistant Card */}
      <AIAssistantCard />
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MOBILE HAMBURGER + SLIDE-OVER DRAWER (< md)
   ───────────────────────────────────────────────────────────────────────── */
function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const prevOverflow = useRef('');

  // Lock / unlock body scroll on drawer open
  useEffect(() => {
    if (open) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow.current;
    }
    return () => {
      document.body.style.overflow = prevOverflow.current;
    };
  }, [open]);

  // Close drawer on browser navigation
  useEffect(() => {
    const handlePopState = () => setOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openDrawer  = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* ── Hamburger button (mobile only) ─────────────────────────────── */}
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-sidebar-drawer"
        className={[
          'md:hidden fixed top-3 left-3 z-50',
          'w-10 h-10 rounded-xl flex items-center justify-center',
          'nav-focus transition-all duration-200 cursor-pointer shadow-lg',
          'border border-[rgba(0,160,220,0.30)] hover:border-cyan-400',
          'hover:bg-[rgba(0,68,160,0.35)]',
        ].join(' ')}
        style={{
          background: 'rgba(7,26,58,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        }}
      >
        <Menu size={19} className="text-cyan-300" />
      </button>

      {/* ── Backdrop Overlay ───────────────────────────────────────────── */}
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={[
          'md:hidden fixed inset-0 z-40',
          'bg-black/65 backdrop-blur-[3px]',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ── Slide-over drawer ──────────────────────────────────────────── */}
      <aside
        id="mobile-sidebar-drawer"
        aria-label="Primary navigation"
        aria-modal="true"
        role="dialog"
        className={[
          'sidebar-scroll sidebar-outer-glow md:hidden',
          'fixed left-0 top-0 h-screen z-50',
          'flex flex-col overflow-y-auto overflow-x-hidden',
          'transition-transform duration-300 ease-out will-change-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        style={{
          width: 230,
          background:
            'linear-gradient(180deg, #071A3A 0%, #061530 50%, #050F24 100%)',
          borderRight: '1px solid rgba(0, 160, 220, 0.20)',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.50)',
        }}
      >
        {/* Drawer header row with Close button */}
        <div className="flex items-center justify-between pr-3">
          <LogoMark showLabelAlways />
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
            className={[
              'nav-focus w-8 h-8 rounded-lg flex items-center justify-center',
              'text-[#456A92] hover:text-white',
              'hover:bg-[rgba(0,68,160,0.30)]',
              'transition-all duration-200 cursor-pointer',
            ].join(' ')}
          >
            <X size={16} />
          </button>
        </div>

        <Divider />

        <span className="px-4 mb-2 text-[9px] font-semibold tracking-[0.20em] text-[#335982] uppercase select-none">
          Navigation
        </span>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              onClick={closeDrawer}
              showLabelAlways
            />
          ))}
        </nav>

        {/* Middle Telemetry Widget */}
        <div className="my-auto py-2">
          <CityGridStatus showLabelAlways />
        </div>

        <AIAssistantCard showLabelAlways />
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN UNIFIED NAVIGATION & LAYOUT EXPORT
   Replaces UserLayout.jsx entirely. Wraps page content with flexible flow.
   ───────────────────────────────────────────────────────────────────────── */
export default function SideNavbar({ children }) {
  return (
    <div className="flex min-h-screen bg-[#06142F] text-[#C8DEFF] overflow-x-hidden">
      {/* Sticky desktop & tablet navigation rail */}
      <DesktopSidebar />

      {/* Mobile drawer & floating hamburger trigger */}
      <MobileSidebar />

      {/* Main page content container - expands flexibly to all remaining width */}
      <main
        id="main-content"
        className="flex-1 min-w-0 min-h-screen flex flex-col"
      >
        {children || <Outlet />}
      </main>
    </div>
  );
}
