/**
 * ORIXA – SideNavbar
 * ──────────────────
 * Clean, interactive sidebar matching the ORIXA reference design.
 *  - Desktop (lg+): 220px sticky sidebar with brand, nav pills, AI card
 *  - Tablet (md–lg): 68px compact icon rail with hover tooltips
 *  - Mobile (<md): Slide-over drawer with backdrop blur
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
} from 'lucide-react';

/* ───────────── NAV CONFIG ───────────── */
const NAV_ITEMS = [
  { label: 'Home',     path: '/home',     icon: Home   },
  { label: 'Journey',  path: '/journey',  icon: Route  },
  { label: 'Live Map', path: '/live-map', icon: MapPin },
  { label: 'Profile',  path: '/profile',  icon: User   },
];

/* ───────────── LOGO ───────────── */
function LogoMark({ showLabel = false, animate = false }) {
  return (
    <div
      className={`flex items-center select-none gap-3 px-5 pt-7 pb-6 transition-all duration-500 ${
        animate ? 'opacity-100 translate-y-0' : ''
      } ${!showLabel ? 'justify-center lg:justify-start lg:px-5 px-0' : ''}`}
    >
      {/* Cyan loop icon */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center orb-pulse"
        style={{ background: 'radial-gradient(circle at 35% 30%, #00F0FF 0%, #0072E5 50%, #0A1128 100%)' }}
      >
        <span className="text-white font-bold text-xs select-none pointer-events-none">✦</span>
      </div>
      <span className={`${showLabel ? 'inline' : 'hidden lg:inline'} text-white font-bold tracking-[0.2em] text-[15px] uppercase`}>
        ORIXA
      </span>
    </div>
  );
}

/* ───────────── NAV ITEM ───────────── */
function NavItem({ item, onClick, showLabel = false, index = 0 }) {
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <NavLink
        to={item.path}
        onClick={onClick}
        aria-label={item.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={({ isActive }) => [
          'relative group flex items-center gap-3',
          showLabel ? 'mx-3 px-4 py-2.5' : 'mx-2 lg:mx-3 px-3 lg:px-4 py-2.5 justify-center lg:justify-start',
          'rounded-xl text-[13px] font-medium',
          'cursor-pointer transition-all duration-200',
          isActive
            ? 'bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.08)]'
            : 'text-slate-400 hover:bg-white/5 hover:text-white',
        ].join(' ')}
      >
        {({ isActive }) => (
          <>
            {/* Active glow bar */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
            )}
            <span className={`flex-shrink-0 w-5 flex items-center justify-center transition-all ${
              isActive ? 'text-[#00F0FF]' : 'text-slate-500 group-hover:text-white'
            }`}>
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
            </span>
            <span className={`${showLabel ? 'inline' : 'hidden lg:inline'} truncate tracking-wide`}>
              {item.label}
            </span>
          </>
        )}
      </NavLink>

      {/* Tablet tooltip */}
      {!showLabel && (
        <div
          className={`
            absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
            hidden md:flex lg:hidden items-center px-3 py-1.5
            rounded-xl text-xs font-semibold text-white whitespace-nowrap pointer-events-none
            transition-all duration-150
            ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
          `}
          style={{
            background: 'rgba(11,19,43,0.95)',
            border: '1px solid rgba(0,240,255,0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          {item.label}
        </div>
      )}
    </div>
  );
}

/* ───────────── AI ASSISTANT CARD ───────────── */
function AIAssistantCard({ showLabel = false }) {
  return (
    <div className={`pb-6 ${showLabel ? 'px-3' : 'px-2 lg:px-3'}`}>
      <button
        type="button"
        aria-label="AI Travel Assistant"
        className={[
          'group w-full flex items-center gap-2.5 relative overflow-hidden',
          showLabel ? 'p-3 justify-start' : 'p-2 lg:p-3 justify-center lg:justify-start',
          'rounded-2xl cursor-pointer text-left',
          'border border-white/[0.08] transition-all duration-300',
          'hover:border-[#00F0FF]/30 hover:bg-white/[0.04]',
          'hover:shadow-[0_0_15px_rgba(0,240,255,0.08)]',
        ].join(' ')}
        style={{
          background: 'linear-gradient(145deg, rgba(11,19,43,0.9) 0%, rgba(8,15,35,0.95) 100%)',
        }}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-[#00F0FF]/20 group-hover:border-[#00F0FF]/50 transition-all group-hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]">
          <img src="/images/orixa_ai_orb.png" alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className={`${showLabel ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}>
          <p className="text-[11.5px] font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
            AI Travel Assistant
          </p>
          <p className="text-[9.5px] text-slate-500 mt-0.5 truncate group-hover:text-[#00F0FF]/60 transition-colors">
            Always here to help
          </p>
        </div>
        <ChevronRight
          size={13}
          className={`${showLabel ? 'block' : 'hidden lg:block'} flex-shrink-0 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all`}
        />
      </button>
    </div>
  );
}

/* ───────────── DESKTOP SIDEBAR ───────────── */
function DesktopSidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="sidebar-scroll hidden md:flex flex-col justify-between flex-shrink-0 sticky top-0 h-screen z-40 overflow-y-auto overflow-x-hidden w-[68px] lg:w-[220px] transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #0A1128 0%, #08102A 50%, #070E24 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div>
        <LogoMark animate />
        {/* Divider */}
        <div className="mx-3 lg:mx-4 h-px bg-white/[0.06] mb-4" />
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.path} item={item} index={i} />
          ))}
        </nav>
      </div>
      <AIAssistantCard />
    </aside>
  );
}

/* ───────────── MOBILE SIDEBAR ───────────── */
function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const prevOverflow = useRef('');

  useEffect(() => {
    if (open) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow.current;
    }
    return () => { document.body.style.overflow = prevOverflow.current; };
  }, [open]);

  useEffect(() => {
    const h = () => setOpen(false);
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  }, [open]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <>
      {/* Hamburger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer border border-white/10 hover:border-[#00F0FF]/40 transition-all active:scale-95"
        style={{ background: 'rgba(11,19,43,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <Menu size={19} className="text-[#00F0FF]" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        aria-label="Navigation"
        className={`md:hidden fixed left-0 top-0 h-screen z-50 flex flex-col overflow-y-auto transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: 240,
          background: 'linear-gradient(180deg, #0A1128 0%, #08102A 50%, #070E24 100%)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '10px 0 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between pr-3">
          <LogoMark showLabel animate />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mx-4 h-px bg-white/[0.06] mb-4" />
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.path} item={item} index={i} onClick={() => setOpen(false)} showLabel />
          ))}
        </nav>
        <div className="flex-1 flex flex-col justify-end">
          <AIAssistantCard showLabel />
        </div>
      </aside>
    </>
  );
}

/* ───────────── LAYOUT EXPORT ───────────── */
export default function SideNavbar({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0B132B] text-[#C8DEFF] overflow-x-hidden">
      <DesktopSidebar />
      <MobileSidebar />
      <main id="main-content" className="flex-1 min-w-0 min-h-screen flex flex-col">
        {children || <Outlet />}
      </main>
    </div>
  );
}
