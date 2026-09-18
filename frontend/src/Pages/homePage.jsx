/**
 * ORIXA – 01. Home / Search Screen
 * ─────────────────────────────────
 * High-fidelity futuristic smart-city dashboard based on the ORIXA 2100 design system.
 * Expansive full-screen layout with balanced vertical rhythm, command center search,
 * and 3-column intelligent transit cards.
 *
 * @file src/Pages/homePage.jsx
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Mic,
  SlidersHorizontal,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Bus,
  Train,
  Plane,
  Car,
  Sparkles,
  Bell,
  CloudSun,
  Navigation,
  X,
  MapPin,
  Zap,
  Activity,
  Wifi,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   DATA FIXTURES
   ───────────────────────────────────────────────────────────────────────── */

const TRANSPORT_MODES = [
  { id: 'bus',   label: 'Bus',   icon: Bus,   desc: 'Autonomous Rapid Transit' },
  { id: 'train', label: 'Train', icon: Train, desc: 'Hyper-Rail & Maglev' },
  { id: 'air',   label: 'Air',   icon: Plane, desc: 'Sky-Taxi & Aero-Pod' },
  { id: 'roads', label: 'Roads', icon: Car,   desc: 'Smart Expressway Pods' },
];

const TIME_OPTIONS = [
  { label: 'Arrive by 08:00 AM', desc: 'Standard morning commute' },
  { label: 'Arrive by 09:30 AM', desc: 'Mid-morning flexible' },
  { label: 'Leave now (Depart 07:18 PM)', desc: 'Immediate dispatch' },
  { label: 'Arrive by 07:42 PM', desc: 'Evening peak window' },
  { label: 'Arrive by 10:15 PM', desc: 'Late night express' },
];

const RECENT_JOURNEYS = [
  {
    id: 'kdu',
    title: 'KDU University',
    location: 'Ratmalana',
    time: '8:00 AM',
    duration: '42 min',
    transfers: '1 transfer',
    status: 'Next Maglev in 4m',
    badgeColor: 'from-cyan-500/20 to-blue-600/20 border-cyan-400/30 text-cyan-300',
    mode: 'Train + Bus',
  },
  {
    id: 'fort',
    title: 'Colombo Fort Central',
    location: 'Intermodal Hub',
    time: '6:30 PM',
    duration: '28 min',
    transfers: 'Direct',
    status: 'Hyper-Rail Platform 3',
    badgeColor: 'from-purple-500/20 to-indigo-600/20 border-purple-400/30 text-purple-300',
    mode: 'Maglev Express',
  },
  {
    id: 'lotus',
    title: 'Lotus Tower Sky-Deck',
    location: 'Mobility Deck',
    time: '4:15 PM',
    duration: '14 min',
    transfers: 'Direct',
    status: 'Corridor 4 Clear',
    badgeColor: 'from-emerald-500/20 to-teal-600/20 border-emerald-400/30 text-emerald-300',
    mode: 'Sky-Taxi Aero',
  },
];

const POPULAR_DESTINATIONS = [
  { name: 'KDU University', area: 'Kandawala Road, Ratmalana', type: 'Campus & Innovation Hub' },
  { name: 'Colombo Fort Railway & Maglev Terminal', area: 'Fort Central, Colombo 01', type: 'Intermodal Transit Hub' },
  { name: 'Bandaranaike Sky-Port Terminal 01', area: 'Katunayake Aero-Zone', type: 'International Skyport' },
  { name: 'Lotus Tower Sky-Deck & Mobility Deck', area: 'D.R. Wijewardena Mawatha', type: 'Autonomous Flight Deck' },
  { name: 'Port City Financial & Marina Station', area: 'Colombo Port City Zone B', type: 'High-speed Maglev' },
];

const QUICK_PICKS = [
  'KDU University',
  'Colombo Fort',
  'Lotus Tower',
  'Port City Marina',
];

const SYSTEM_NOTIFICATIONS = [
  { id: 1, title: 'Autonomous Rail 07 on schedule', time: '2m ago', unread: true },
  { id: 2, title: 'Sky-Taxi corridor 4 visibility optimal', time: '14m ago', unread: true },
  { id: 3, title: 'Morning temperature 28°C · Light sea breeze', time: '1h ago', unread: false },
];

/* ─────────────────────────────────────────────────────────────────────────
   MAIN HOME / SEARCH COMPONENT
   ───────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();

  // Search & input states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMode, setSelectedMode] = useState('train');
  const [selectedTime, setSelectedTime] = useState('Arrive by 08:00 AM');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Popover & modal states
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Refs for dropdown outside click
  const timeDropdownRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Handle outside click dismissal
  useEffect(() => {
    function handleClickOutside(e) {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target)) {
        setIsTimeDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotificationMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toast trigger helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Start voice assistant simulation
  const startVoiceSearch = () => {
    setIsVoiceModalOpen(true);
    setIsListening(true);
    setVoiceTranscript('Listening for destination...');
    setTimeout(() => {
      setVoiceTranscript('“Take me to KDU University before 8 AM”');
      setTimeout(() => {
        setIsListening(false);
      }, 1800);
    }, 1500);
  };

  // Apply voice query
  const applyVoiceDestination = (dest = 'KDU University') => {
    setSearchQuery(dest);
    setIsVoiceModalOpen(false);
    triggerToast(`Destination set to "${dest}" via ORIXA Voice Assistant`);
  };

  // Plan journey action
  const handlePlanJourney = () => {
    const destination = searchQuery.trim() || 'KDU University';
    triggerToast(`Optimizing neural route to ${destination} (${selectedTime})...`);
    setTimeout(() => {
      navigate('/journey');
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#C8DEFF] bg-[#06142F] select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND: CINEMATIC FUTURISTIC SMART-CITY PANORAMA & VIGNETTES
          ───────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* City Landscape Photo */}
        <img
          src="/images/futuristic_city.jpg"
          alt="Futuristic Smart City Panorama 2100"
          className="absolute right-0 top-0 w-full lg:w-[85%] h-[680px] lg:h-[800px] object-cover object-top opacity-50 lg:opacity-70 transition-opacity duration-700"
        />

        {/* Left deep dark-navy fade so controls and text are ultra-legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #06142F 0%, #06142F 22%, rgba(6,20,47,0.88) 45%, rgba(6,20,47,0.50) 70%, rgba(6,20,47,0.25) 100%)',
          }}
        />

        {/* Bottom deep gradient fade for cards */}
        <div
          className="absolute inset-x-0 bottom-0 h-[520px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,20,47,0) 0%, rgba(6,20,47,0.80) 40%, #06142F 92%)',
          }}
        />

        {/* Top subtle atmospheric haze */}
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,20,47,0.75) 0%, rgba(6,20,47,0) 100%)',
          }}
        />

        {/* Subtle glowing ambient cyan & purple orbs in background */}
        <div className="absolute top-24 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-24 right-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          EXPANSIVE FULL-SCREEN CONTENT WRAPPER
          Uses justify-between with min-h-screen so content spans the screen
          ───────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 w-full max-w-[1720px] mx-auto gap-8 lg:gap-10">

        {/* ─────────────────────────────────────────────────────────────
            1. TOP BAR: GREETING (LEFT) & SYSTEM TELEMETRY (RIGHT)
            ───────────────────────────────────────────────────────────── */}
        <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left: Tagline + Greeting + Subtitle (indented on mobile for hamburger button) */}
          <div className="space-y-1.5 pl-12 md:pl-0">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(8,26,60,0.65)] border border-cyan-400/25 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00D4FF]" />
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-cyan-300">
                ORIXA 2100 · Autonomous Multi-Modal Mobility
              </span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight drop-shadow-md">
              Good morning, Oshen
            </h1>
            <p className="text-xs sm:text-sm text-[#8CA9CE] font-normal tracking-wide">
              Where do you want to go today? Neural routing is active.
            </p>
          </div>

          {/* Right: Weather, System Status, Notifications, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap pt-1">
            {/* Weather Widget */}
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[rgba(8,26,60,0.75)] backdrop-blur-md border border-[rgba(0,180,255,0.20)] shadow-sm hover:border-cyan-400/40 transition-all cursor-default group"
              title="Colombo, Sri Lanka · Live Microclimate Feed"
            >
              <CloudSun size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs font-semibold text-white tracking-wide">28°C</span>
                <span className="text-[10px] text-[#7899BE] font-medium">Colombo</span>
              </div>
            </div>

            {/* City Network Operational Status Pill */}
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(8,26,60,0.75)] backdrop-blur-md border border-emerald-500/30 shadow-sm cursor-default"
              title="Autonomous Transit Grid 100% Operational"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-300 tracking-wide hidden xs:inline">
                City grid online
              </span>
            </div>

            {/* Notification Bell with Badge */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                aria-label="System notifications"
                className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(8,26,60,0.75)] backdrop-blur-md border border-[rgba(0,180,255,0.20)] hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
              >
                <Bell size={17} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D4FF]" />
              </button>

              {/* Notification Popover Dropdown */}
              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#071b3d]/98 backdrop-blur-xl border border-cyan-500/30 p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15 px-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">Grid Updates</span>
                    <span className="text-[10px] text-cyan-400 cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-2 max-h-56 overflow-y-auto">
                    {SYSTEM_NOTIFICATIONS.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-cyan-500/10 transition-colors text-left cursor-pointer"
                      >
                        <span className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${item.unread ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-200 font-medium truncate">{item.title}</p>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill / Menu */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl bg-[rgba(8,26,60,0.75)] backdrop-blur-md border border-[rgba(0,180,255,0.20)] hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group"
                aria-label="User account menu"
              >
                {/* Avatar with purple gradient */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-[11px] font-bold text-white shadow-sm ring-1 ring-white/20">
                  OK
                </div>
                <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors hidden md:inline">
                  Oshen Karunathilaka
                </span>
                <ChevronDown size={13} className="text-slate-400 group-hover:text-cyan-300 transition-colors" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#071b3d]/98 backdrop-blur-xl border border-cyan-500/30 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-cyan-500/15">
                    <p className="text-xs font-semibold text-white">Oshen Karunathilaka</p>
                    <p className="text-[10px] text-cyan-400 font-mono">Citizen ID #2100-98X</p>
                  </div>
                  <div className="py-1 flex flex-col gap-0.5 text-xs text-slate-300">
                    <button
                      type="button"
                      onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/15 hover:text-white transition-colors"
                    >
                      User Profile & Passes
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowProfileMenu(false); navigate('/journey'); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/15 hover:text-white transition-colors"
                    >
                      Travel Preferences
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowProfileMenu(false); triggerToast('Pass synced: Unlimited Smart Transit 2100'); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/15 hover:text-white transition-colors"
                    >
                      Pass Balance: 480 Credits
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            2. CENTRAL COMMAND DECK (HERO SEARCH & JOURNEY PLANNING)
            Expansive, centered command hub with prominent search & controls
            ───────────────────────────────────────────────────────────── */}
        <section className="my-auto py-2 w-full max-w-4xl">
          {/* Section Subtitle */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400/90">
              Neural Route Orchestrator
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </div>

          {/* Prominent Frosted Search Bar */}
          <div className="relative" ref={searchContainerRef}>
            <div
              className={`
                group relative flex items-center gap-3.5 px-5 py-3.5 sm:py-4 rounded-2xl
                bg-[rgba(7,24,54,0.78)] backdrop-blur-2xl
                border transition-all duration-300 shadow-2xl
                ${
                  isSearchFocused
                    ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-[0_0_35px_rgba(0,212,255,0.25)]'
                    : 'border-[rgba(0,180,255,0.22)] hover:border-cyan-400/50'
                }
              `}
            >
              {/* Left Search Icon */}
              <Search
                size={22}
                className={`transition-colors duration-200 flex-shrink-0 ${
                  isSearchFocused ? 'text-cyan-400' : 'text-[#58789E] group-hover:text-cyan-400'
                }`}
              />

              {/* Search Destination Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search destination, station, sky-port, or waypoint..."
                aria-label="Search destination"
                className="w-full bg-transparent text-white placeholder-[#5D7C9F] text-sm sm:text-base font-normal outline-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePlanJourney();
                }}
              />

              {/* Clear button if text exists */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-500/10 transition-colors"
                  aria-label="Clear destination input"
                >
                  <X size={16} />
                </button>
              )}

              {/* Filter Icon Button */}
              <button
                type="button"
                onClick={() => triggerToast('Transport filters: All modes active, fastest route priority')}
                aria-label="Filter routes"
                className="p-2 rounded-xl text-[#58789E] hover:text-cyan-300 hover:bg-cyan-500/15 transition-all cursor-pointer"
                title="Filter preferences"
              >
                <SlidersHorizontal size={18} />
              </button>

              {/* Microphone Button (Voice Search Trigger) */}
              <button
                type="button"
                onClick={startVoiceSearch}
                aria-label="Voice destination search"
                title="Search with ORIXA Voice Assistant"
                className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 hover:text-white hover:bg-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.20)]"
              >
                <Mic size={18} />
              </button>
            </div>

            {/* Destination Autocomplete Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#07193b]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl z-40 p-2 overflow-hidden animate-in fade-in duration-200">
                <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
                  Suggested Smart Destinations
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {POPULAR_DESTINATIONS.filter((dest) =>
                    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    dest.area.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((dest, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSearchQuery(dest.name);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/15 text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                          <MapPin size={15} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                            {dest.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{dest.area}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/20 hidden sm:inline">
                        {dest.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Controls Row: Time Selector + Mode Selector + CTA Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 sm:mt-5">
            <div className="flex flex-wrap items-center gap-3">
              {/* Arrival Time Selector Dropdown */}
              <div className="relative" ref={timeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  aria-expanded={isTimeDropdownOpen}
                  aria-label="Select arrival time"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[rgba(7,24,54,0.75)] backdrop-blur-xl border border-[rgba(0,180,255,0.22)] hover:border-cyan-400/50 text-xs sm:text-sm text-slate-200 transition-all cursor-pointer shadow-md group"
                >
                  <Clock size={16} className="text-cyan-400 group-hover:scale-105 transition-transform" />
                  <span className="text-slate-400 font-normal">Arrive by</span>
                  <span className="font-semibold text-white">
                    {selectedTime.replace('Arrive by ', '')}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isTimeDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {/* Time Dropdown Menu */}
                {isTimeDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#07193b]/98 backdrop-blur-xl border border-cyan-500/30 shadow-2xl z-40 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-cyan-400 uppercase">
                      Select Arrival Window
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {TIME_OPTIONS.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSelectedTime(opt.label);
                            setIsTimeDropdownOpen(false);
                            triggerToast(`Schedule set: ${opt.label}`);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            selectedTime === opt.label
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                              : 'text-slate-300 hover:bg-cyan-500/10 hover:text-white'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{opt.label}</p>
                            <p className="text-[10px] text-slate-400">{opt.desc}</p>
                          </div>
                          {selectedTime === opt.label && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D4FF]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Mode Filters */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(7,24,54,0.65)] border border-[rgba(0,180,255,0.16)] backdrop-blur-md">
                {TRANSPORT_MODES.map((mode) => {
                  const IconComponent = mode.icon;
                  const isActive = selectedMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedMode(mode.id)}
                      aria-label={`Select ${mode.label} mode`}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                        ${
                          isActive
                            ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                            : 'text-[#6284AC] hover:text-[#C8DEFF] hover:bg-white/5 border border-transparent'
                        }
                      `}
                    >
                      <IconComponent size={14} />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* "Plan My Journey →" CTA Button */}
            <button
              type="button"
              onClick={handlePlanJourney}
              className="group relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#0092E4] to-[#6056F8] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_24px_rgba(0,212,255,0.38)] hover:shadow-[0_0_35px_rgba(0,212,255,0.60)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Subtle shine sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
              <span>Plan My Journey</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>

          {/* Quick Picks Chips */}
          <div className="flex items-center gap-2 mt-3.5 flex-wrap">
            <span className="text-[11px] text-[#55769A] font-medium">Quick Picks:</span>
            {QUICK_PICKS.map((pick, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchQuery(pick);
                  triggerToast(`Selected ${pick}`);
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] bg-cyan-950/40 hover:bg-cyan-500/15 border border-cyan-400/20 hover:border-cyan-400/40 text-[#82A8D2] hover:text-cyan-300 transition-all cursor-pointer"
              >
                {pick}
              </button>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. EXPANSIVE LOWER DASHBOARD GRID (3-COLUMN BALANCED CARDS)
            Spans the full screen width and height elegantly
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">

          {/* ── CARD 1: Recent Journeys & Smart Routes ─────────────────── */}
          <div
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[rgba(7,24,54,0.75)] backdrop-blur-2xl border border-[rgba(0,180,255,0.18)] hover:border-cyan-400/40 transition-all duration-300 shadow-2xl"
            style={{
              boxShadow: '0 8px 32px rgba(0, 8, 24, 0.45), inset 0 0 0 1px rgba(0, 180, 255, 0.08)',
            }}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/10">
                <span className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  Your Recent Journeys
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/journey')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View all</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Journey Items List */}
              <div className="flex flex-col gap-2.5 mt-3.5">
                {RECENT_JOURNEYS.map((journey) => (
                  <div
                    key={journey.id}
                    onClick={() => {
                      setSearchQuery(journey.title);
                      triggerToast(`Loaded route: ${journey.title}`);
                    }}
                    className="group/item flex items-center justify-between p-2.5 rounded-xl bg-[rgba(10,32,68,0.50)] hover:bg-[rgba(0,80,180,0.22)] border border-[rgba(0,180,255,0.10)] hover:border-cyan-400/35 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Navigation Icon Badge */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${journey.badgeColor} border flex-shrink-0`}
                      >
                        <Navigation size={15} className="rotate-45" />
                      </div>

                      {/* Journey Details */}
                      <div>
                        <p className="text-xs sm:text-[13px] font-semibold text-white group-hover/item:text-cyan-300 transition-colors">
                          {journey.title}
                        </p>
                        <p className="text-[11px] text-[#6E90B8] mt-0.5">
                          {journey.time} &nbsp;·&nbsp; {journey.duration} &nbsp;·&nbsp; {journey.transfers}
                        </p>
                      </div>
                    </div>

                    {/* Chevron Arrow */}
                    <ChevronRight
                      size={15}
                      className="text-[#436284] group-hover/item:text-cyan-400 group-hover/item:translate-x-0.5 transition-all flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick frequency footer */}
            <div className="pt-3 mt-3 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-[#6284AC]">
              <span>Next departure window:</span>
              <span className="text-cyan-300 font-mono font-medium">08:00 AM · On Schedule</span>
            </div>
          </div>

          {/* ── CARD 2: "Let ORIXA plan it for you" (AI Assistant Card) ── */}
          <div
            className="relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-[rgba(10,32,70,0.85)] via-[rgba(7,24,54,0.80)] to-[rgba(12,25,55,0.88)] backdrop-blur-2xl border border-[rgba(0,180,255,0.22)] hover:border-cyan-400/50 transition-all duration-300 shadow-2xl group"
            style={{
              boxShadow: '0 8px 32px rgba(0, 8, 24, 0.45), inset 0 0 0 1px rgba(0, 212, 255, 0.12)',
            }}
          >
            {/* Glowing Background Ambiance */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Top Row: AI Mascot Orb & Status Tag */}
              <div className="flex items-start justify-between">
                {/* 3D Holographic AI Orb Mascot */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_18px_rgba(0,212,255,0.35)] flex items-center justify-center">
                    <img
                      src="/images/orixa_ai_orb.jpg"
                      alt="ORIXA AI Assistant Mascot Orb"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Subtle live indicator pulse */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#06142F] flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                </div>

                {/* AI Model Badge */}
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider text-cyan-300 uppercase bg-cyan-950/70 border border-cyan-400/30 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-cyan-400" />
                  Neural AI Co-Pilot
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="my-3">
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Let ORIXA plan it for you
                </h3>
                <p className="text-xs text-[#82A3CA] mt-1 leading-relaxed font-normal">
                  Tell us your destination and we’ll compute the optimal multi-modal route in real time.
                </p>
              </div>

              {/* Simulated Live Audio Equalizer Waveform */}
              <div className="flex items-center justify-center gap-1 h-6 my-2 px-3 py-1 rounded-lg bg-cyan-950/30 border border-cyan-500/15">
                {[30, 60, 90, 45, 100, 75, 40, 85, 55, 30].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-cyan-400/80 animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDuration: `${0.4 + (i % 3) * 0.25}s`,
                    }}
                  />
                ))}
                <span className="text-[10px] text-cyan-300/80 ml-2 font-mono">Neural Voice HUD</span>
              </div>
            </div>

            {/* Voice Search Action Button */}
            <button
              type="button"
              onClick={startVoiceSearch}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[rgba(9,34,77,0.85)] hover:bg-[rgba(0,180,255,0.20)] border border-[rgba(0,212,255,0.40)] hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(0,212,255,0.15)] hover:shadow-[0_0_24px_rgba(0,212,255,0.30)] transition-all duration-200 cursor-pointer mt-3"
            >
              <Mic size={14} className="animate-pulse text-cyan-400" />
              <span>Launch Voice Assistant</span>
            </button>
          </div>

          {/* ── CARD 3: City Transit Grid Telemetry & Live Map ─────────── */}
          <div
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[rgba(7,24,54,0.75)] backdrop-blur-2xl border border-[rgba(0,180,255,0.18)] hover:border-cyan-400/40 transition-all duration-300 shadow-2xl"
            style={{
              boxShadow: '0 8px 32px rgba(0, 8, 24, 0.45), inset 0 0 0 1px rgba(0, 180, 255, 0.08)',
            }}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/10">
                <span className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                  <Activity size={16} className="text-cyan-400" />
                  City Transit Telemetry
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>

              {/* Real-time Transit Telemetry Metrics */}
              <div className="space-y-2.5 mt-3.5">
                <div className="p-2.5 rounded-xl bg-[rgba(10,32,68,0.50)] border border-[rgba(0,180,255,0.10)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Train size={16} className="text-cyan-400" />
                    <div>
                      <p className="text-xs font-medium text-white">Hyper-Rail Lines 01–08</p>
                      <p className="text-[10px] text-[#6E90B8]">Velocity: 340 km/h · Nominal</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">99.8%</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[rgba(10,32,68,0.50)] border border-[rgba(0,180,255,0.10)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Plane size={16} className="text-cyan-400" />
                    <div>
                      <p className="text-xs font-medium text-white">Sky-Taxi Air Corridors</p>
                      <p className="text-[10px] text-[#6E90B8]">Corridor 4 Clear · 128 Active</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-cyan-300 font-mono">Optimal</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[rgba(10,32,68,0.50)] border border-[rgba(0,180,255,0.10)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Car size={16} className="text-cyan-400" />
                    <div>
                      <p className="text-xs font-medium text-white">Autonomous Pod Grid</p>
                      <p className="text-[10px] text-[#6E90B8]">Smart Wave Active · Zero Wait</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">100%</span>
                </div>
              </div>
            </div>

            {/* Live Map CTA Button */}
            <button
              type="button"
              onClick={() => navigate('/live-map')}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/25 hover:border-cyan-400/50 text-cyan-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer mt-3"
            >
              <span className="flex items-center gap-2">
                <Wifi size={14} className="text-cyan-400" />
                <span>Explore Live City Map</span>
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MODAL: FUTURISTIC AI VOICE SEARCH HUD
          ───────────────────────────────────────────────────────────────── */}
      {isVoiceModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-[#081d42] to-[#05132d] border border-cyan-400/40 shadow-[0_0_50px_rgba(0,212,255,0.25)] text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close voice assistant"
            >
              <X size={18} />
            </button>

            {/* AI Hologram Mascot Orb */}
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_30px_rgba(0,212,255,0.5)] flex items-center justify-center">
                <img
                  src="/images/orixa_ai_orb.jpg"
                  alt="ORIXA Assistant"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Outer pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping pointer-events-none" />
            </div>

            {/* AI Assistant Title */}
            <h4 className="text-lg font-semibold text-white">
              ORIXA Voice Assistant
            </h4>
            <p className="text-xs text-cyan-400 font-mono mt-1">
              {isListening ? '● Live Audio Feed Active' : 'Speech recognized'}
            </p>

            {/* Voice Audio Waveform Bars */}
            <div className="flex items-center justify-center gap-1.5 h-10 my-4">
              {[40, 75, 95, 60, 100, 45, 80, 50, 90, 65, 30].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-full bg-cyan-400 ${
                    isListening ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    height: isListening ? `${h}%` : '20%',
                    animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Transcript text box */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-sm text-slate-200 font-medium min-h-[50px] flex items-center justify-center">
              {voiceTranscript}
            </div>

            {/* Quick destination suggestion buttons */}
            <div className="mt-5 space-y-2">
              <span className="text-[11px] text-slate-400 block">
                Or choose a quick destination:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => applyVoiceDestination('KDU University')}
                  className="px-3 py-1.5 rounded-xl text-xs bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 font-medium transition-all"
                >
                  KDU University
                </button>
                <button
                  type="button"
                  onClick={() => applyVoiceDestination('Colombo Fort')}
                  className="px-3 py-1.5 rounded-xl text-xs bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 font-medium transition-all"
                >
                  Colombo Fort
                </button>
                <button
                  type="button"
                  onClick={() => applyVoiceDestination('Lotus Tower Sky-Deck')}
                  className="px-3 py-1.5 rounded-xl text-xs bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 font-medium transition-all"
                >
                  Lotus Tower Sky-Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          TOAST FEEDBACK NOTIFICATION
          ───────────────────────────────────────────────────────────────── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#09224d]/95 backdrop-blur-xl border border-cyan-400/50 shadow-[0_0_25px_rgba(0,212,255,0.30)] text-white text-xs sm:text-sm font-medium animate-in slide-in-from-bottom-5 duration-200"
        >
          <Zap size={16} className="text-cyan-400 flex-shrink-0 animate-bounce" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
