/**
 * ORIXA – Profile Page
 * ─────────────────────
 * • Working sub-tabs (Overview, Identity, Vehicle Access, Preferences, Settings)
 * • Functional notification bell + profile dropdown
 * • Interactive vehicle cards, action tiles, achievement buttons
 * • Fully responsive via ProfilePage.css
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, Bell, ChevronDown, ArrowRight, Fingerprint,
  X, Train, MapPin, Zap, AlertCircle, Leaf, ShieldCheck,
  Settings, Sliders, LogOut, User as UserIcon,
  Eye, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AppLayout from '../components/user/AppLayout';
import './HomePage.css';
import './ProfilePage.css';

/* ─── Chart data ─── */
const commuteData = [
  { name: 'Sun', distance: 12 },
  { name: 'Mon', distance: 45 },
  { name: 'Tue', distance: 38 },
  { name: 'Wed', distance: 52 },
  { name: 'Thu', distance: 40 },
  { name: 'Fri', distance: 25 },
  { name: 'Sat', distance: 15 },
];

/* ─── Mock notifications ─── */
const MOCK_NOTIFS = [
  { id: 1, type: 'alert',   title: 'Rail disruption', body: 'Autonomous Rail 07 delayed by 6 min.', time: '2 min ago', read: false },
  { id: 2, type: 'success', title: 'Journey completed', body: 'KDU University trip — 42 min.', time: '1 hr ago', read: true },
];

const SUB_TABS = ['Overview', 'Identity', 'Vehicle Access', 'Preferences', 'Settings'];

export default function ProfilePage() {
  const navigate = useNavigate();

  const [subTab, setSubTab]           = useState('Overview');
  const [showNotifs, setShowNotifs]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFS);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles, setVehicles]       = useState([
    { id: 'rail07', name: 'RAIL 07', seat: 'Seat 3A – Quiet Zone',  active: true  },
    { id: 'pod14',  name: 'POD 14',  seat: 'Default Layout',         active: true  },
  ]);
  const [prefs, setPrefs] = useState({
    alerts: true,
    largeText: false,
    audioGuide: false,
    dataSharing: true,
  });
  const [prefMode, setPrefMode] = useState('Rail');

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  /* Close dropdowns on outside click */
  useEffect(() => {
    const h = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const revokeVehicle = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, active: false } : v));
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  /* ── Tab content renderer ── */
  const renderTabContent = () => {
    switch (subTab) {
      case 'Overview':
        return <OverviewTab vehicles={vehicles} revokeVehicle={revokeVehicle} prefMode={prefMode} setPrefMode={setPrefMode} />;
      case 'Identity':
        return <IdentityTab />;
      case 'Vehicle Access':
        return <VehicleTab vehicles={vehicles} revokeVehicle={revokeVehicle} />;
      case 'Preferences':
        return <PreferencesTab prefs={prefs} setPrefs={setPrefs} prefMode={prefMode} setPrefMode={setPrefMode} />;
      case 'Settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <main className="profile-content" aria-label="Profile page">

        {/* ══════════ HEADER ══════════ */}
        <div className="profile-header">
          <div className="profile-search-wrap">
            <div className="search-bar-container">
              <Search size={18} color="#6B8FB5" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search preferences, vehicles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search profile settings"
              />
            </div>
          </div>

          <div className="profile-header-controls">
            {/* Network status */}
            <div className="network-pill" aria-label="City network operational">
              <div className="network-dot" style={{ background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              City network operational
            </div>
            {/* Weather */}
            <div className="weather-pill" aria-label="Weather: 28°C, Colombo">
              <span className="weather-icon">🌤️</span>
              <div className="weather-text"><strong>28°C</strong><small>Colombo</small></div>
            </div>

            {/* Bell */}
            <div className="notif-wrapper" ref={notifRef}>
              <button
                type="button"
                className="bell-btn"
                onClick={() => { setShowNotifs(p => !p); setShowProfile(false); }}
                aria-label={`Notifications${unreadCount ? ` — ${unreadCount} unread` : ''}`}
                aria-expanded={showNotifs}
              >
                <Bell size={18} />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
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
                        <span className={`notif-dot ${n.type}`} />
                        <div className="notif-content">
                          <strong>{n.title}</strong>
                          <p>{n.body}</p>
                          <small>{n.time}</small>
                        </div>
                        {!n.read && <span className="unread-dot" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="profile-pill-wrapper" ref={profileRef}>
              <button
                type="button"
                className="profile-pill"
                onClick={() => { setShowProfile(p => !p); setShowNotifs(false); }}
                aria-expanded={showProfile}
                aria-label="Profile menu"
              >
                <div className="avatar" style={{ background: '#8B5CF6' }} aria-hidden="true">OK</div>
                <span className="profile-name">Oshen Karunathilaka</span>
                <ChevronDown size={14} />
              </button>
              {showProfile && (
                <div className="dropdown-panel profile-dropdown" role="menu">
                  <div className="pd-user">
                    <div className="avatar" style={{ width: 40, height: 40, fontSize: 14, background: '#8B5CF6' }}>OK</div>
                    <div>
                      <div className="pd-name">Oshen Karunathilaka</div>
                      <div className="pd-tier">Pro Commuter · Level 24</div>
                    </div>
                  </div>
                  <div className="pd-divider" />
                  <Link to="/profile" className="pd-item" role="menuitem" onClick={() => setShowProfile(false)}>
                    <UserIcon size={15} /> My Profile
                  </Link>
                  <button type="button" className="pd-item" role="menuitem" onClick={() => { setShowProfile(false); setSubTab('Settings'); }}>
                    <Settings size={15} /> Settings
                  </button>
                  <div className="pd-divider" />
                  <button type="button" className="pd-item pd-logout" role="menuitem" onClick={() => { setShowProfile(false); navigate('/home'); }}>
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════ MAIN GRID ══════════ */}
        <div className="profile-grid">

          {/* LEFT COLUMN */}
          <div className="pg-left">

            {/* User Banner */}
            <div className="user-identity-banner">
              <div className="avatar-wrapper">
                <img src="/images/avatar_portrait.png" alt="Oshen Karunathilaka" className="avatar-large" />
                <div className="avatar-status-dot" aria-label="Online" />
              </div>
              <div className="user-info">
                <h1>Oshen Karunathilaka</h1>
                <div className="user-tier">Pro Commuter | Level 24</div>
                <div className="kpi-strip">
                  <div className="kpi-item"><span>Total Distance</span><strong className="cyan">34,500 km</strong></div>
                  <div className="kpi-item"><span>Time Saved</span><strong>112 hrs</strong></div>
                  <div className="kpi-item"><span>Carbon Avoided</span><strong>1.5 Tons</strong></div>
                </div>
              </div>
            </div>

            {/* Sub Navigation */}
            <nav className="profile-sub-nav" aria-label="Profile sections">
              {SUB_TABS.map(tab => (
                <button
                  key={tab}
                  type="button"
                  className={`sub-nav-item ${subTab === tab ? 'active' : ''}`}
                  onClick={() => setSubTab(tab)}
                  aria-current={subTab === tab ? 'page' : undefined}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Tab Content */}
            {renderTabContent()}
          </div>

          {/* RIGHT COLUMN: Analytics Rail */}
          <div className="pg-right analytics-rail">

            {/* Achievement */}
            <div className="ar-card ach-card">
              <div className="ach-icon" aria-hidden="true"><Leaf size={24} /></div>
              <h3>Sustainability Milestone Reached!</h3>
              <p>150 low-impact trips completed.</p>
              <button
                type="button"
                className="ach-btn"
                onClick={() => setSubTab('Preferences')}
                aria-label="View sustainability badges"
              >
                View badges
              </button>
            </div>

            {/* Travel Journal */}
            <div className="ar-card">
              <div className="ar-card-title">Travel Journal</div>
              <div className="chart-container" aria-label="Weekly commute chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={commuteData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B8FB5', fontSize: 11 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(20,225,255,0.1)' }}
                      contentStyle={{ background: 'rgba(10,20,42,0.9)', border: '1px solid #14E1FF', borderRadius: '8px' }}
                    />
                    <Bar dataKey="distance" fill="#14E1FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="top-dest">
                <div className="top-dest-icon" aria-hidden="true"><MapPin size={18} /></div>
                <div className="top-dest-text">
                  <p>Most Visited</p>
                  <h4>KDU University (5 trips)</h4>
                </div>
              </div>
            </div>

            {/* Comfort & Safety */}
            <div className="ar-card">
              <div className="ar-card-title">Comfort &amp; Safety Status</div>
              <div className="diag-list">
                <div className="diag-item"><span>In-Vehicle Air Quality</span><strong className="green">Excellent</strong></div>
                <div className="diag-item"><span>Personal Safety Check</span><strong className="green">Clear</strong></div>
                <div className="diag-item">
                  <span>Route Stability</span>
                  <strong><ShieldCheck size={14} color="#10B981" aria-hidden="true" /> Verified</strong>
                </div>
              </div>
              <button
                type="button"
                className="mood-select"
                onClick={() => setSubTab('Preferences')}
                aria-label="Change lighting preference"
              >
                Preferred Lighting: Warm Ambient
                <ChevronDown size={14} color="#6B8FB5" aria-hidden="true" />
              </button>
            </div>

            {/* Sustainable Goals */}
            <div className="ar-card">
              <div className="ar-card-title">Personal Sustainable Goals</div>
              <div className="goal-stat">
                <h2>65%</h2>
                <span>achieved</span>
              </div>
              <div className="goal-bar-bg" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="65% of goal achieved">
                <div className="goal-bar-fill" />
              </div>
              <div className="goal-next">
                <Leaf size={14} aria-hidden="true" /> Next goal: Plant 5 virtual trees
              </div>
            </div>

          </div>
        </div>
      </main>
    </AppLayout>
  );
}

/* ═══════════════════════════════════════════
   SUB-TAB COMPONENTS
═══════════════════════════════════════════ */

function OverviewTab({ vehicles, revokeVehicle, prefMode }) {
  return (
    <>
      {/* Auth cards */}
      <div className="auth-grid">
        <div className="auth-card">
          <div className="auth-icon-wrap" style={{ background: 'rgba(20,225,255,0.1)', color: '#14E1FF' }}>
            <Fingerprint size={32} aria-hidden="true" />
          </div>
          <div className="auth-text">
            <h3>Biometric Status</h3>
            <div className="auth-status cyan"><ShieldCheck size={14} aria-hidden="true" /> Secure</div>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-icon-wrap">
            <img src="/images/neural_hologram.png" alt="Neural hologram interface" />
          </div>
          <div className="auth-text">
            <h3>MindLink Connect</h3>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#94A3B8' }}>Mode: Direct Interface</p>
            <div className="auth-status">
              <div className="network-dot" style={{ background: '#10B981', boxShadow: 'none' }} /> Connected
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Access */}
      <VehicleTab vehicles={vehicles} revokeVehicle={revokeVehicle} />

      {/* Action Strip */}
      <div className="action-strip">
        <div className="action-tile" role="button" tabIndex={0} onClick={() => alert('Changing preferred mode…')} onKeyDown={e => e.key === 'Enter' && alert('Changing preferred mode…')}>
          <div className="at-header"><span>Preferred Mode</span><Train size={16} aria-hidden="true" /></div>
          <div className="at-value">{prefMode}</div>
        </div>
        <div className="action-tile" role="button" tabIndex={0} onClick={() => alert('Updating accessibility settings…')} onKeyDown={e => e.key === 'Enter' && alert('Updating accessibility…')}>
          <div className="at-header"><span>Accessibility</span><AlertCircle size={16} aria-hidden="true" /></div>
          <div className="at-value">None</div>
        </div>
        <div className="action-tile" role="button" tabIndex={0} onClick={() => alert('Alerts are enabled.')} onKeyDown={e => e.key === 'Enter' && alert('Alerts enabled.')}>
          <div className="at-header"><span>Alerts</span><Bell size={16} aria-hidden="true" /></div>
          <div className="at-value">Enabled</div>
        </div>
      </div>
    </>
  );
}

function IdentityTab() {
  const [biometricActive, setBiometricActive] = useState(true);
  return (
    <div className="tab-section">
      <div className="section-title">Identity &amp; Authentication</div>
      <div className="auth-grid">
        <div className="auth-card">
          <div className="auth-icon-wrap" style={{ background: 'rgba(20,225,255,0.1)', color: '#14E1FF' }}>
            <Fingerprint size={32} aria-hidden="true" />
          </div>
          <div className="auth-text">
            <h3>Biometric Auth</h3>
            <div className={`auth-status ${biometricActive ? 'cyan' : ''}`}>
              <ShieldCheck size={14} aria-hidden="true" /> {biometricActive ? 'Active & Secure' : 'Disabled'}
            </div>
            <button
              type="button"
              className="tab-action-btn"
              onClick={() => setBiometricActive(p => !p)}
              style={{ marginTop: 8 }}
            >
              {biometricActive ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-icon-wrap">
            <img src="/images/neural_hologram.png" alt="Neural interface" />
          </div>
          <div className="auth-text">
            <h3>MindLink Connect</h3>
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#94A3B8' }}>Mode: Direct Interface</p>
            <div className="auth-status">
              <div className="network-dot" style={{ background: '#10B981', boxShadow: 'none' }} /> Connected
            </div>
          </div>
        </div>
      </div>
      <div className="id-info-card">
        <div className="id-row"><span>ORIXA ID</span><strong>#ORX-44821</strong></div>
        <div className="id-row"><span>Member Since</span><strong>March 2024</strong></div>
        <div className="id-row"><span>Verification Level</span><strong className="cyan">Level 3 – Verified</strong></div>
        <div className="id-row"><span>Digital Passport</span><strong>Active</strong></div>
      </div>
    </div>
  );
}

function VehicleTab({ vehicles, revokeVehicle }) {
  return (
    <div className="tab-section">
      <div className="section-title">Personal Vehicle &amp; Pod Access</div>
      <div className="vehicle-manager">
        {vehicles.map(v => (
          <div key={v.id} className={`vehicle-card ${!v.active ? 'revoked' : ''}`}>
            <div className="vc-left">
              {v.id === 'rail07' ? (
                <img src="/images/train_pod.png" alt="Train pod" className="vc-thumb" />
              ) : (
                <div className="vc-thumb" style={{ background: '#0B1933', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1D3A6B' }}>
                  <MapPin color="#14E1FF" aria-hidden="true" />
                </div>
              )}
              <div className="vc-info">
                <h4>{v.name}</h4>
                <p>Access Keys: {v.active ? 'Active' : <span style={{ color: '#EF4444' }}>Revoked</span>}</p>
              </div>
            </div>
            <div className="vc-right">
              {v.active && (
                <>
                  <div className="vc-seat" role="button" tabIndex={0} onClick={() => alert(`Configuring ${v.seat}…`)} onKeyDown={e => e.key === 'Enter' && alert(`Configuring ${v.seat}…`)}>
                    {v.seat} <ChevronDown size={14} aria-hidden="true" />
                  </div>
                  <button
                    type="button"
                    className="vc-eject"
                    onClick={() => revokeVehicle(v.id)}
                    aria-label={`Revoke access to ${v.name}`}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </>
              )}
              {!v.active && <span className="vc-revoked-label">Access Revoked</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreferencesTab({ prefs, setPrefs, prefMode, setPrefMode }) {
  const togglePref = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  const MODES = ['Rail', 'Bus', 'Air', 'Roads'];
  return (
    <div className="tab-section">
      <div className="section-title">Travel Preferences</div>

      {/* Preferred mode */}
      <div className="pref-section-card">
        <div className="pref-section-title">Preferred Transport Mode</div>
        <div className="pref-mode-grid">
          {MODES.map(m => (
            <button
              key={m}
              type="button"
              className={`pref-mode-btn ${prefMode === m ? 'active' : ''}`}
              onClick={() => setPrefMode(m)}
              aria-pressed={prefMode === m}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle preferences */}
      <div className="pref-section-card">
        <div className="pref-section-title">Notifications &amp; Accessibility</div>
        {[
          { key: 'alerts',      label: 'Journey Alerts',    desc: 'Real-time disruption notifications' },
          { key: 'largeText',   label: 'Large Text Mode',   desc: 'Increase font sizes across the app' },
          { key: 'audioGuide',  label: 'Audio Guidance',    desc: 'Voice-guided navigation instructions' },
          { key: 'dataSharing', label: 'Usage Analytics',   desc: 'Help improve ORIXA with anonymised data' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="pref-toggle-row">
            <div className="pref-toggle-info">
              <span className="pref-label">{label}</span>
              <span className="pref-desc">{desc}</span>
            </div>
            <button
              type="button"
              className={`toggle-btn ${prefs[key] ? 'on' : 'off'}`}
              onClick={() => togglePref(key)}
              aria-pressed={prefs[key]}
              aria-label={`${label}: ${prefs[key] ? 'on' : 'off'}`}
            >
              {prefs[key] ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="tab-section">
      <div className="section-title">Account Settings</div>
      <div className="settings-list">
        {[
          { label: 'Edit Profile',          desc: 'Update name, email, photo',          icon: <UserIcon size={18} /> },
          { label: 'Security & Password',   desc: 'Manage your login credentials',      icon: <ShieldCheck size={18} /> },
          { label: 'Linked Accounts',       desc: 'Connect external services',          icon: <Zap size={18} /> },
          { label: 'Privacy Controls',      desc: 'Manage data & permissions',          icon: <Eye size={18} /> },
          { label: 'App Preferences',       desc: 'Theme, language, region',            icon: <Sliders size={18} /> },
          { label: 'Help & Support',        desc: 'FAQs, contact ORIXA support',        icon: <AlertCircle size={18} /> },
        ].map(({ label, desc, icon }) => (
          <button
            key={label}
            type="button"
            className="settings-row"
            onClick={() => alert(`Opening: ${label}`)}
            aria-label={label}
          >
            <div className="settings-icon" aria-hidden="true">{icon}</div>
            <div className="settings-text">
              <span className="settings-label">{label}</span>
              <span className="settings-desc">{desc}</span>
            </div>
            <ArrowRight size={16} className="settings-arrow" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="settings-danger-zone">
        <div className="section-title" style={{ color: '#F87171' }}>Danger Zone</div>
        <button type="button" className="danger-btn" onClick={() => alert('This would delete your account.')}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
