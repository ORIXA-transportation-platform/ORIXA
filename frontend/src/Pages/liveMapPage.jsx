/**
 * ORIXA – Live Map Page
 * ─────────────────────
 * Full-screen map HUD with telemetry panels.
 * • Receives journey state from Journey page
 * • Back button → /journey
 * • Transport layer toggles update state
 * • Journey update card: "View changes" opens inline panel
 * • Map pins clickable
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Bell, ChevronDown, MapPin, Bus, Train, Plane, Car,
  ArrowRight, AlertTriangle, CheckCircle, Leaf, Compass, ShieldCheck, X, Menu
} from 'lucide-react';
import AppLayout from '../components/user/AppLayout';
import './HomePage.css';
import './LiveMapPage.css';

export default function LiveMapPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { journey } = location.state || {};

  const [toggles, setToggles] = useState({ bus: false, train: true, air1: false, air2: false, roads: false });
  const [showChanges, setShowChanges] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <AppLayout>
      <div className="map-page-wrapper" aria-label="Live Map">

        {/* ── BACKGROUND MAP ── */}
        <div className="map-canvas-bg" aria-hidden="true">
          <div className="map-canvas-overlay" />

          {/* KDU University Pin */}
          <button
            type="button"
            className={`map-pin ${selectedPin === 'kdu' ? 'pin-selected' : ''}`}
            style={{ top: '35%', left: '60%' }}
            onClick={() => setSelectedPin(selectedPin === 'kdu' ? null : 'kdu')}
            aria-label="KDU University pin"
            aria-pressed={selectedPin === 'kdu'}
          >
            <div className="pin-icon-circle" aria-hidden="true"><MapPin size={14} /></div>
            KDU University
          </button>

          {/* You Are Here */}
          <div
            className="you-are-here-marker"
            style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}
            aria-label="Your current location"
          >
            <button
              type="button"
              className={`map-pin ${selectedPin === 'me' ? 'pin-selected' : ''}`}
              style={{ position: 'relative', top: '-25px' }}
              onClick={() => setSelectedPin(selectedPin === 'me' ? null : 'me')}
              aria-label="Your location"
              aria-pressed={selectedPin === 'me'}
            >
              <div className="pin-icon-circle" aria-hidden="true"><MapPin size={14} /></div>
              You are here
            </button>
            <div className="orb-glow" aria-hidden="true" />
          </div>

          {/* Train Pin */}
          <button
            type="button"
            className={`map-pin train-pin ${selectedPin === 'train' ? 'pin-selected' : ''}`}
            style={{ top: '45%', left: '25%' }}
            onClick={() => setSelectedPin(selectedPin === 'train' ? null : 'train')}
            aria-label="Autonomous Rail 07 location"
            aria-pressed={selectedPin === 'train'}
          >
            <div className="pin-icon-circle" aria-hidden="true"><Train size={14} /></div>
            <div>
              <p>Autonomous Rail 07</p>
              <small>4 min to next stop</small>
            </div>
          </button>

          {/* Floating train pod image */}
          <img
            src="/images/train_pod.png"
            alt="Train pod"
            className="floating-train-pod"
            style={{ top: '48%', left: '35%' }}
          />
        </div>

        {/* ── HUD OVERLAY ── */}
        <div className="hud-layer">

          {/* HEADER */}
          <div className="map-header">
            <div className="map-title-row">
              <button
                type="button"
                className="back-btn-map"
                onClick={() => navigate('/journey')}
                aria-label="Back to journey"
              >
                <ArrowLeft size={20} />
              </button>
              <h1>Live Map</h1>
              <div className="live-badge" aria-label="Live data">
                <div className="live-dot" aria-hidden="true" />Live
              </div>
            </div>

            <div className="hud-top-right">
              <div className="network-pill">
                <div className="network-dot" style={{ background: '#10B981', boxShadow: 'none' }} />
                City network operational
              </div>
              <div className="weather-pill">
                <span className="weather-icon">🌤️</span>
                <div className="weather-text"><strong>28°C</strong><small>Colombo</small></div>
              </div>
              <button type="button" className="bell-btn" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <div
                className="profile-pill"
                role="button"
                tabIndex={0}
                aria-label="Profile: Oshen Karunathilaka"
              >
                <div className="avatar" style={{ background: '#8B5CF6', color: '#FFF' }} aria-hidden="true">OK</div>
                <span className="profile-name">Oshen Karunathilaka</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* LEFT CONTROLS */}
          <div className="map-controls-left">
            <div className="layer-toggles-container" role="group" aria-label="Map layers">
              {[
                { key: 'bus',   Icon: Bus,   label: 'Bus'   },
                { key: 'train', Icon: Train, label: 'Train' },
                { key: 'air1',  Icon: Plane, label: 'Air'   },
                { key: 'roads', Icon: Car,   label: 'Roads' },
              ].map(({ key, Icon, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`map-control-btn ${toggles[key] ? 'active' : ''}`}
                  onClick={() => handleToggle(key)}
                  aria-pressed={toggles[key]}
                  aria-label={`Toggle ${label} layer`}
                >
                  <Icon size={18} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="compass-btn"
              aria-label="Reset map orientation"
              onClick={() => setSelectedPin(null)}
            >
              <Compass size={20} style={{ transform: 'rotate(45deg)' }} aria-hidden="true" />
            </button>
          </div>

          {/* RIGHT TELEMETRY */}
          <div className="telemetry-column" role="complementary" aria-label="Journey telemetry">

            {/* A. Journey Update */}
            {!dismissed && (
              <div className="tele-card card-purple">
                <div className="ju-top">
                  <div className="ju-icon" aria-hidden="true"><AlertTriangle size={20} /></div>
                  <div className="ju-text">
                    <small>Journey Update</small>
                    <h3>Rail disruption detected</h3>
                    <p>Your journey has been re-optimised.</p>
                  </div>
                  <button
                    type="button"
                    className="ju-close"
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss notification"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="ju-bottom">
                  <div className="ju-eta">
                    <h4>New arrival</h4>
                    <div className="ju-eta-times">
                      <span className="new">7:41 PM</span>
                      <span className="old">7:35 PM</span>
                    </div>
                  </div>
                  <div className="ju-actions">
                    <span className="badge-changes">11 new changes</span>
                    <button
                      type="button"
                      className="btn-view-changes"
                      onClick={() => setShowChanges(p => !p)}
                      aria-expanded={showChanges}
                    >
                      {showChanges ? 'Hide changes' : 'View changes'}
                    </button>
                  </div>
                </div>
                {/* Changes panel */}
                {showChanges && (
                  <div className="changes-panel" role="region" aria-label="Route changes">
                    <div className="change-item">
                      <CheckCircle size={13} className="change-ok" aria-hidden="true" />
                      Rerouted via Southern Express Line
                    </div>
                    <div className="change-item">
                      <CheckCircle size={13} className="change-ok" aria-hidden="true" />
                      New Platform: D2 → B4
                    </div>
                    <div className="change-item">
                      <AlertTriangle size={13} className="change-warn" aria-hidden="true" />
                      Arrival shifted by +6 minutes
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* B. Train Telemetry */}
            <div className="tele-card">
              <div className="train-header">
                <div className="th-left">
                  <h3>Autonomous Rail 07</h3>
                  <div className="th-status" aria-label="Status: Moving normally">
                    <CheckCircle size={14} aria-hidden="true" /> Moving normally
                  </div>
                </div>
                <div className="th-right">
                  <img src="/images/train_pod.png" alt="Rail 07 train pod" />
                </div>
              </div>
              <div className="train-mid">
                <div className="tm-left">
                  <small>Next stop</small>
                  <div>Central Hub</div>
                </div>
                <div className="tm-right" aria-label="4 minutes">4 min</div>
              </div>
              <div className="train-scrubber" aria-label="Train progress">
                <div className="ts-bar" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                  <div className="ts-fill" />
                  <div className="ts-dot" />
                </div>
                <div className="ts-labels" aria-hidden="true">
                  <span>KDU</span>
                  <span>to next stop</span>
                  <span>Final Stop</span>
                </div>
              </div>
            </div>

            {/* C. Journey Guardian */}
            <div className="tele-card">
              <div className="guardian-header">
                <div className="gh-title">
                  <div className="gh-icon" aria-hidden="true"><ShieldCheck size={24} /></div>
                  <div className="gh-text">
                    <h3>Journey Guardian</h3>
                    <p>Your travel congestion</p>
                  </div>
                </div>
                <div className="gh-badge" aria-label="Status: All good">
                  <CheckCircle size={12} aria-hidden="true" /> All good
                </div>
              </div>
              <div className="check-list-g">
                {['Route stable', 'Your usual travel preference', 'High vehicle availability'].map(item => (
                  <div key={item} className="c-item">
                    <CheckCircle size={16} aria-hidden="true" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* D. Journey Impact */}
            <div className="tele-card">
              <div className="impact-header">
                <div className="impact-icon" aria-hidden="true"><Leaf size={28} /></div>
                <div className="impact-text">
                  <p>Your Journey Impact</p>
                  <h2>Low impact</h2>
                </div>
              </div>
              <div className="impact-sub">12% less energy than fastest route</div>
              <div className="impact-bar" role="progressbar" aria-valuenow={88} aria-valuemin={0} aria-valuemax={100} aria-label="Impact level: 88%">
                <div className="impact-fill" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
