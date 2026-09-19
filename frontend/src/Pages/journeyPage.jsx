/**
 * ORIXA – Journey Page
 * ─────────────────────
 * Receives destination + transport state from Home page.
 * Shows:
 *  1. Route Results list (select a route)
 *  2. Journey Detail view (timeline, start journey)
 * Functional back button, preference pills, Start Journey → Live Map.
 */

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft, Bell, ChevronDown, MapPin, Footprints, Bus, Train,
  ArrowRight, Shuffle, Armchair, Volume2, Type, CheckCircle2,
  ChevronUp, ChevronRight, Clock, Leaf, AlertTriangle, Sparkles, Accessibility
} from 'lucide-react';
import AppLayout from '../components/user/AppLayout';
import './HomePage.css';
import './JourneyPage.css';

/* ─── Mock route options ─── */
const buildRoutes = (destination) => [
  {
    id: 1,
    label: 'Recommended',
    badge: 'FASTEST',
    badgeColor: 'cyan',
    dest: destination || 'KDU University',
    eta: 'Arrive by 7:42 AM',
    confidence: '97%',
    duration: '42 min',
    transfers: '2 transfers',
    co2: 'Low impact',
    aiContext: 'Recommended because it is 12 min faster and avoids current hyperloop congestion.',
    legs: [
      { type: 'walk',  label: 'Walk', duration: '4 min' },
      { type: 'bus',   label: 'Bus',  duration: '12 min' },
      { type: 'train', label: 'Rail', duration: '21 min' },
    ],
  },
  {
    id: 2,
    label: 'Alternative',
    badge: 'FEWER STOPS',
    badgeColor: 'purple',
    dest: destination || 'KDU University',
    eta: 'Arrive by 7:58 AM',
    confidence: '91%',
    duration: '56 min',
    transfers: '1 transfer',
    co2: 'Medium impact',
    legs: [
      { type: 'walk',  label: 'Walk', duration: '6 min' },
      { type: 'train', label: 'Rail', duration: '45 min' },
    ],
  },
  {
    id: 3,
    label: 'Budget',
    badge: 'CHEAPEST',
    badgeColor: 'green',
    dest: destination || 'KDU University',
    eta: 'Arrive by 8:15 AM',
    confidence: '88%',
    duration: '71 min',
    transfers: 'Direct',
    co2: 'Very low impact',
    legs: [
      { type: 'bus', label: 'Bus', duration: '65 min' },
    ],
  },
];

const LEG_ICON = { walk: Footprints, bus: Bus, train: Train };

export default function JourneyPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const { destination = 'KDU University', transport = 'bus', arrivalTime = '08:00', accessPrefs = [] } =
    location.state || {};

  const routes = buildRoutes(destination);

  /* Two-step view: results → detail */
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [explainerOpen, setExplainerOpen] = useState(true);
  const [activePrefs, setActivePrefs]     = useState(['comfort']);
  const [isStarting, setIsStarting]       = useState(false);

  const togglePref = (id) =>
    setActivePrefs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );

  const handleStartJourney = () => {
    setIsStarting(true);
    setTimeout(() => navigate('/live-map', { state: { journey: selectedRoute } }), 800);
  };

  /* ── Route Results View ── */
  if (!selectedRoute) {
    return (
      <AppLayout>
        <main className="journey-content" aria-label="Journey results">
          {/* HEADER */}
          <div className="journey-header">
            <div className="jh-left">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate('/home')}
                aria-label="Back to home"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1>Journey Results</h1>
                <p className="jh-subtitle">
                  <MapPin size={13} aria-hidden="true" /> {destination}
                  &nbsp;·&nbsp;
                  <Clock size={13} aria-hidden="true" /> by {arrivalTime}
                </p>
              </div>
            </div>
            <div className="jh-right-controls">
              <div className="weather-pill" aria-label="Weather">
                <span className="weather-icon">🌤️</span>
                <div className="weather-text">
                  <strong>28°C</strong>
                  <small>Colombo</small>
                </div>
              </div>
              <div className="network-pill">
                <div className="network-dot" />
                City network operational
              </div>
              <button type="button" className="bell-btn" aria-label="Notifications">
                <Bell />
              </button>
              <div className="profile-pill" aria-label="Profile">
                <div className="avatar" style={{ background: '#8B5CF6' }}>OK</div>
                <span className="profile-name">Oshen Karunathilaka</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
          
          {/* Predictive Delay Alert */}
          {transport === 'train' && (
             <div className="predictive-delay-banner" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', padding: '16px', borderRadius: '12px', margin: '24px 24px 0 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AlertTriangle color="#EF4444" size={24} style={{ flexShrink: 0 }} />
                <div>
                   <h4 style={{ color: '#EF4444', margin: '0 0 4px 0', fontSize: '15px' }}>Possible Delay Detected</h4>
                   <p style={{ margin: 0, fontSize: '13px', color: '#FCA5A5' }}>AI predicts a 15–20 minute delay on the Southern Express Line due to heavy passenger density. Alternative routes have been prioritized below.</p>
                </div>
             </div>
          )}

          {/* ROUTE CARDS */}
          <div className="route-results-list">
            {routes.map(route => {
              const badgeClass = `route-badge badge-${route.badgeColor}`;
              return (
                <button
                  key={route.id}
                  type="button"
                  className="route-card"
                  onClick={() => setSelectedRoute(route)}
                  aria-label={`Select route: ${route.label} — ${route.duration}`}
                >
                  <div className="rc-top">
                    <div className="rc-left">
                      <span className={badgeClass}>{route.badge}</span>
                      <h3>{route.label}</h3>
                      <p className="rc-eta">{route.eta}</p>
                    </div>
                    <div className="rc-right">
                      <div className="rc-duration">{route.duration}</div>
                      <div className="rc-confidence">✨ {route.confidence} confidence</div>
                    </div>
                  </div>

                  {/* Leg schematic */}
                  <div className="rc-legs">
                    {route.legs.map((leg, idx) => {
                      const Icon = LEG_ICON[leg.type] || Bus;
                      return (
                        <React.Fragment key={idx}>
                          <div className="rc-leg">
                            <div className={`rc-leg-icon leg-${leg.type}`}>
                              <Icon size={14} aria-hidden="true" />
                            </div>
                            <span>{leg.label}</span>
                            <span className="rc-leg-time">{leg.duration}</span>
                          </div>
                          {idx < route.legs.length - 1 && (
                            <ChevronRight size={14} className="rc-leg-sep" aria-hidden="true" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  
                  {/* AI & Accessibility Context */}
                  {route.aiContext && (
                    <div className="ai-routing-context" style={{ padding: '12px 16px', background: 'rgba(20, 225, 255, 0.05)', borderTop: '1px solid rgba(20, 225, 255, 0.1)', borderBottom: '1px solid rgba(20, 225, 255, 0.1)', fontSize: '13px', color: '#8BADC1', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Sparkles size={14} color="#14E1FF" style={{ flexShrink: 0 }} />
                        <span><strong>AI Recommended:</strong> {route.aiContext}</span>
                    </div>
                  )}
                  {accessPrefs.length > 0 && route.id === 1 && (
                    <div className="access-routing-context" style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid rgba(16, 185, 129, 0.1)', fontSize: '13px', color: '#A7F3D0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Accessibility size={14} color="#10B981" style={{ flexShrink: 0 }} />
                        <span>Accessible route selected because you prefer <strong>{accessPrefs.join(', ').toLowerCase()}</strong> travel.</span>
                    </div>
                  )}

                  <div className="rc-footer">
                    <span className="rc-meta">{route.transfers}</span>
                    <span className="rc-meta">
                      <Leaf size={12} aria-hidden="true" /> {route.co2}
                    </span>
                    <span className="rc-select-cta">
                      Select <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </AppLayout>
    );
  }

  /* ── Journey Detail View ── */
  return (
    <AppLayout>
      <main className="journey-content" aria-label="Journey details">

        {/* HEADER */}
        <div className="journey-header">
          <div className="jh-left">
            <button
              type="button"
              className="back-btn"
              onClick={() => setSelectedRoute(null)}
              aria-label="Back to route results"
            >
              <ArrowLeft size={20} />
            </button>
            <h1>Journey Details</h1>
          </div>
          <div className="jh-right-controls">
            <div className="weather-pill">
              <span className="weather-icon">🌤️</span>
              <div className="weather-text">
                <strong>28°C</strong>
                <small>Colombo</small>
              </div>
            </div>
            <div className="network-pill">
              <div className="network-dot" />
              City network operational
            </div>
            <button type="button" className="bell-btn" aria-label="Notifications">
              <Bell />
            </button>
            <div className="profile-pill">
              <div className="avatar" style={{ background: '#8B5CF6' }}>OK</div>
              <span className="profile-name">Oshen Karunathilaka</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* JOURNEY GRID */}
        <div className="journey-grid">

          {/* LEFT: Timeline */}
          <div className="j-col-left">

            {/* Destination summary */}
            <div className="journey-summary-card">
              <div className="summary-top">
                <div className="dest-details">
                  <div className="dest-icon"><MapPin size={24} /></div>
                  <div className="dest-text">
                    <h2>{selectedRoute.dest}</h2>
                    <p>Kandawala Road, Ratmalana</p>
                  </div>
                </div>
                <div className="eta-badge">
                  <h3>{selectedRoute.eta.replace('Arrive by ', '')}</h3>
                  <div className="ai-confidence">✨ {selectedRoute.confidence} confidence</div>
                </div>
              </div>
              <div className="optimization-banner">
                <div className="opt-left">
                  <span className="opt-glow-tag">JOURNEY OPTIMIZED</span>
                  <span className="opt-stats">{selectedRoute.duration} • {selectedRoute.transfers}</span>
                </div>
                <button
                  type="button"
                  className="opt-link"
                  onClick={() => setExplainerOpen(true)}
                  aria-label="Why this route?"
                >
                  Why this route? <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-container">

              <div className="timeline-item">
                <div className="timeline-visual">
                  <div className="t-node cyan"><Footprints /></div>
                  <div className="t-line cyan" />
                </div>
                <div className="timeline-content">
                  <h4>Your Location</h4>
                  <p>4 min walk • 320 m</p>
                  <Link to="/live-map" style={{ color: '#14E1FF', fontSize: '13px', textDecoration: 'none' }}>
                    View on map →
                  </Link>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-visual">
                  <div className="t-node cyan"><Bus /></div>
                  <div className="t-line cyan" />
                </div>
                <div className="timeline-content">
                  <h4>Autonomous Bus (Rail 07 8-204)</h4>
                  <div className="t-meta" style={{ marginBottom: '8px' }}>
                    <span className="status-pill">On-time</span>
                    <span className="t-meta-text">Departs in 3 min • Platform A</span>
                  </div>
                  <p>12 min transit time</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-visual">
                  <div className="t-node dark"><MapPin size={12} /></div>
                  <div className="t-line dotted" />
                  <div className="t-node dark" style={{ marginTop: '8px' }}><MapPin size={12} /></div>
                  <div className="t-line dotted" />
                </div>
                <div className="timeline-content">
                  <h4>Intermodal Transfer Hub</h4>
                  <p>2 min transfer • Station map • Accessible from Platform B</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-visual">
                  <div className="t-node purple"><Train /></div>
                </div>
                <div className="timeline-content">
                  <h4>Autonomous Rail (Rail 07)</h4>
                  <div className="t-meta" style={{ marginBottom: '8px' }}>
                    <span className="status-pill" style={{ color: '#8B5CF6', background: 'rgba(139,92,246,0.1)' }}>
                      Connection secured
                    </span>
                  </div>
                  <p>21 min transit time</p>
                </div>
              </div>

              <button
                type="button"
                className={`start-journey-btn ${isStarting ? 'loading' : ''}`}
                onClick={handleStartJourney}
                disabled={isStarting}
                aria-label="Start journey"
              >
                {isStarting ? (
                  <>Preparing journey…</>
                ) : (
                  <>Start Journey <ArrowRight size={18} aria-hidden="true" /></>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Preview + Preferences + Explainer */}
          <div className="j-col-right">

            {/* Preview */}
            <div className="preview-card">
              <h3>Journey Preview</h3>
              <div className="schematic">
                {selectedRoute.legs.map((leg, idx) => {
                  const Icon = LEG_ICON[leg.type] || Bus;
                  return (
                    <React.Fragment key={idx}>
                      <div className="sch-step">
                        <div className={`sch-icon ${leg.type === 'train' ? 'sch-icon-purple' : ''}`}>
                          <Icon size={16} aria-hidden="true" />
                        </div>
                        <span className="sch-label">{leg.label}</span>
                      </div>
                      {idx < selectedRoute.legs.length - 1 && (
                        <div className="sch-connector">
                          <span className="sch-connector-line" />
                          <ChevronRight size={16} color="#6B8FB5" aria-hidden="true" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="duration-matrix">
                {selectedRoute.legs.map((leg, idx) => (
                  <div className="d-item" key={idx}>
                    <span>{leg.label}</span>
                    <strong>{leg.duration}</strong>
                  </div>
                ))}
                <div className="d-item d-total">
                  <span>Total</span>
                  <strong>{selectedRoute.duration}</strong>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="preferences-bar" role="group" aria-label="Journey preferences">
              {[
                { id: 'fewer',   Icon: Shuffle,  label: 'Fewer transfers' },
                { id: 'comfort', Icon: Armchair, label: 'More comfort' },
                { id: 'audio',   Icon: Volume2,  label: 'Visual + Audio' },
                { id: 'ai',      Icon: Type,     label: 'Large text / AI' },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`pref-pill ${activePrefs.includes(id) ? 'active' : ''}`}
                  onClick={() => togglePref(id)}
                  aria-pressed={activePrefs.includes(id)}
                  aria-label={label}
                >
                  <Icon size={14} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>

            {/* Explainer */}
            <div className="explainer-card">
              <div
                className="exp-header"
                role="button"
                tabIndex={0}
                onClick={() => setExplainerOpen(p => !p)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExplainerOpen(p => !p); }}
                aria-expanded={explainerOpen}
                aria-controls="explainer-content"
              >
                <h3>✨ Why this route?</h3>
                <ChevronUp
                  size={20}
                  color="#6B8FB5"
                  style={{ transform: explainerOpen ? 'rotate(0)' : 'rotate(180deg)', transition: '0.2s' }}
                  aria-hidden="true"
                />
              </div>

              {explainerOpen && (
                <div id="explainer-content" className="exp-content">
                  <div className="check-list">
                    {[
                      'Lowest congestion on this route',
                      'Short transfer distance',
                      'Matches your travel preference',
                      'High vehicle availability',
                    ].map(item => (
                      <div key={item} className="check-item">
                        <CheckCircle2 aria-hidden="true" /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="city-image-card">
                    <img src="/images/green_transit.png" alt="Sustainable transit corridor" />
                    <div className="city-image-overlay">
                      <p>A more comfortable, efficient and sustainable journey.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </main>
    </AppLayout>
  );
}
