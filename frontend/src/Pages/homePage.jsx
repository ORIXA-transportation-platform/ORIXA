/**
 * ORIXA – Home Page
 * ─────────────────
 * • Destination search with validation
 * • Arrival time picker
 * • Transport mode selector
 * • Plan My Journey → navigates to /journey with state
 * • Notification panel
 * • Profile dropdown
 * • Recent journeys → clickable
 * • AI Travel Assistant card
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, Mic, Calendar, ChevronDown, Bell, MapPin, Clock,
  ArrowRight, ChevronRight, Bus, Train, Plane, Car, X,
  AlertCircle, CheckCircle, LogOut, Settings, User as UserIcon
} from 'lucide-react';
import AppLayout from '../components/user/AppLayout';
import './HomePage.css';

/* ─── Mock recent journeys ─── */
const RECENT_JOURNEYS = [
  { id: 1, dest: 'KDU University',  icon: 'blue', time: '8:00 AM', duration: '42 min', transfers: '1 transfer',  iconType: 'map' },
  { id: 2, dest: 'Colombo Fort',    icon: 'gray', time: '6:30 PM', duration: '28 min', transfers: 'Direct',      iconType: 'clock' },
];

/* ─── Mock notifications ─── */
const NOTIFICATIONS = [
  { id: 1, type: 'alert',   title: 'Rail disruption',       body: 'Autonomous Rail 07 delayed by 6 min.', time: '2 min ago', read: false },
  { id: 2, type: 'success', title: 'Journey completed',     body: 'KDU University trip — 42 min.', time: '1 hr ago',  read: false },
  { id: 3, type: 'info',    title: 'Weather update',        body: 'Light rain expected after 6 PM.', time: '3 hr ago', read: true  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [activeTransport, setActiveTransport] = useState('bus');
  const [destination, setDestination]         = useState('');
  const [arrivalTime, setArrivalTime]         = useState('08:00');
  const [validationMsg, setValidationMsg]     = useState('');
  const [isListening, setIsListening]         = useState(false);
  const [showNotifs, setShowNotifs]           = useState(false);
  const [showProfile, setShowProfile]         = useState(false);
  const [notifications, setNotifications]     = useState(NOTIFICATIONS);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Handlers ── */
  const handlePlan = () => {
    if (!destination.trim()) {
      setValidationMsg('Please enter a destination to plan your journey.');
      document.getElementById('destInput')?.focus();
      return;
    }
    setValidationMsg('');
    navigate('/journey', {
      state: { destination: destination.trim(), transport: activeTransport, arrivalTime },
    });
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setValidationMsg('Voice search is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      setDestination(event.results[0][0].transcript);
      setValidationMsg('');
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setValidationMsg('Voice recognition failed. Please type your destination.');
    };
    recognition.onend = () => setIsListening(false);
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const openJourney = (dest) => {
    navigate('/journey', { state: { destination: dest, transport: activeTransport, arrivalTime } });
  };

  return (
    <AppLayout>
      <main className="main-content" aria-label="Home page content">

        {/* ── Background city image ── */}
        <div className="bg-image-container" aria-hidden="true">
          <img src="/images/futuristic_city.png" alt="" className="bg-image" />
          <div className="bg-overlay" />
        </div>

        <div className="content-wrapper">

          {/* ══════════ HEADER ══════════ */}
          <div className="header-row">
            <div className="welcome-block">
              <div className="motto">AI-DRIVEN COMMUTE</div>
              <h1>Welcome back, Oshen</h1>
              <div className="question">Where are we optimizing your travel to today?</div>
            </div>

            <div className="top-controls">
              {/* Row 1: bell + profile */}
              <div className="controls-row-1">

                {/* Bell / Notifications */}
                <div className="notif-wrapper" ref={notifRef}>
                  <button
                    type="button"
                    className="bell-btn"
                    onClick={() => { setShowNotifs(p => !p); setShowProfile(false); }}
                    aria-label={`Notifications${unreadCount ? ` — ${unreadCount} unread` : ''}`}
                    aria-expanded={showNotifs}
                  >
                    <Bell />
                    {unreadCount > 0 && <span className="notif-badge" aria-hidden="true">{unreadCount}</span>}
                  </button>

                  {showNotifs && (
                    <div className="dropdown-panel notif-panel" role="dialog" aria-label="Notifications">
                      <div className="dp-header">
                        <span>Notifications</span>
                        <button type="button" className="dp-mark-read" onClick={markAllRead}>Mark all read</button>
                      </div>
                      <div className="dp-body">
                        {notifications.map(n => (
                          <div key={n.id} className={`notif-item ${n.read ? 'read' : 'unread'}`}>
                            <span className={`notif-dot ${n.type}`} aria-hidden="true" />
                            <div className="notif-content">
                              <strong>{n.title}</strong>
                              <p>{n.body}</p>
                              <small>{n.time}</small>
                            </div>
                            {!n.read && <span className="unread-dot" aria-label="Unread" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile pill */}
                <div className="profile-pill-wrapper" ref={profileRef}>
                  <button
                    type="button"
                    className="profile-pill"
                    onClick={() => { setShowProfile(p => !p); setShowNotifs(false); }}
                    aria-expanded={showProfile}
                    aria-label="Open profile menu"
                  >
                    <div className="avatar" aria-hidden="true">OB</div>
                    <span className="profile-name">Oshen Karunathilaka</span>
                    <ChevronDown size={14} />
                  </button>

                  {showProfile && (
                    <div className="dropdown-panel profile-dropdown" role="menu">
                      <div className="pd-user">
                        <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>OB</div>
                        <div>
                          <div className="pd-name">Oshen Karunathilaka</div>
                          <div className="pd-tier">Pro Commuter · Level 24</div>
                        </div>
                      </div>
                      <div className="pd-divider" />
                      <Link to="/profile" className="pd-item" role="menuitem" onClick={() => setShowProfile(false)}>
                        <UserIcon size={15} /> My Profile
                      </Link>
                      <Link to="/profile" className="pd-item" role="menuitem" onClick={() => setShowProfile(false)}>
                        <Settings size={15} /> Settings
                      </Link>
                      <div className="pd-divider" />
                      <button type="button" className="pd-item pd-logout" role="menuitem" onClick={() => { setShowProfile(false); navigate('/home'); }}>
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: weather + status (hidden on small mobile) */}
              <div className="controls-row-2">
                <div className="weather-pill" aria-label="Current weather: 28°C, Colombo">
                  <span className="weather-icon" aria-hidden="true">🌤️</span>
                  <div className="weather-text">
                    <strong>28°C</strong>
                    <small>Colombo</small>
                  </div>
                </div>
                <div className="network-pill" aria-label="City network status">
                  <div className="network-dot" aria-hidden="true" />
                  City network operational
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ SEARCH ══════════ */}
          <div className="search-container">

            {/* Destination input */}
            <div className={`search-bar ${validationMsg ? 'has-error' : ''}`}>
              <Search aria-hidden="true" />
              <input
                id="destInput"
                type="text"
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => { setDestination(e.target.value); if (validationMsg) setValidationMsg(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handlePlan(); }}
                aria-label="Destination"
                aria-describedby={validationMsg ? 'dest-error' : undefined}
                autoComplete="off"
              />
              <button
                type="button"
                className={`mic-btn ${isListening ? 'listening' : ''}`}
                onClick={handleVoice}
                aria-label={isListening ? 'Listening…' : 'Voice search'}
              >
                <Mic />
              </button>
            </div>

            {/* Validation message */}
            {validationMsg && (
              <div id="dest-error" className="validation-msg" role="alert">
                <AlertCircle size={14} aria-hidden="true" />
                {validationMsg}
              </div>
            )}

            {/* Search actions row */}
            <div className="search-actions">
              <button
                type="button"
                className="arrival-btn"
                aria-label="Set arrival time"
              >
                <div className="arrival-info">
                  <Calendar aria-hidden="true" />
                  <div className="arrival-text">
                    <small>Arrival by</small>
                    <strong>
                      <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="time-input"
                        aria-label="Arrival time"
                      />
                    </strong>
                  </div>
                </div>
                <ChevronDown aria-hidden="true" />
              </button>

              <button
                type="button"
                className="plan-btn"
                onClick={handlePlan}
                aria-label="Plan my journey"
              >
                Plan My Journey
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ══════════ TRANSPORT MODE ══════════ */}
          <div className="transport-toggles" role="group" aria-label="Select transport mode">
            {[
              { id: 'bus',   label: 'Bus',   Icon: Bus   },
              { id: 'train', label: 'Train', Icon: Train },
              { id: 'air',   label: 'Air',   Icon: Plane },
              { id: 'roads', label: 'Roads', Icon: Car   },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`transport-btn ${activeTransport === id ? 'active' : ''}`}
                onClick={() => setActiveTransport(id)}
                aria-pressed={activeTransport === id}
                aria-label={`${label} transport`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* ══════════ DASHBOARD CARDS ══════════ */}
          <div className="dashboard-cards">

            {/* Recent Journeys */}
            <div className="glass-card">
              <div className="card-header">
                <h2>Your Recent Journeys</h2>
                <Link to="/journey" className="card-view-all" aria-label="View all journeys">
                  View all <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div className="journey-list">
                {RECENT_JOURNEYS.map(j => (
                  <button
                    key={j.id}
                    type="button"
                    className="journey-item"
                    onClick={() => openJourney(j.dest)}
                    aria-label={`Journey to ${j.dest}, ${j.duration}, ${j.transfers}`}
                  >
                    <div className={`journey-icon ${j.icon}`} aria-hidden="true">
                      {j.iconType === 'map' ? <MapPin size={22} /> : <Clock size={22} />}
                    </div>
                    <div className="journey-info">
                      <h3>{j.dest}</h3>
                      <p>
                        <Clock size={12} aria-hidden="true" /> {j.time} &nbsp;·&nbsp;
                        <Clock size={12} aria-hidden="true" /> {j.duration} &nbsp;·&nbsp; {j.transfers}
                      </p>
                    </div>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="glass-card ai-card">
              <div className="ai-image-bg" style={{ backgroundImage: "url('/images/ai_robot.png')" }} aria-hidden="true" />
              <div className="ai-card-content">
                <h2>Let ORIXA plan it for you</h2>
                <p>Tell us your destination and we'll find the best route, in real-time.</p>
                <button
                  type="button"
                  className="voice-btn"
                  onClick={handleVoice}
                  aria-label="Try voice search"
                >
                  <Mic size={16} aria-hidden="true" />
                  {isListening ? 'Listening…' : 'Try Voice Search'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </AppLayout>
  );
}
