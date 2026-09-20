/**
 * ORIXA – Landing Page
 * ─────────────────────
 * A fully interactive, immersive cyberpunk landing page.
 * Features: animated background, glassmorphism, hover interactions,
 * animated stats counter, floating particles, scroll animations.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, ScanFace, TrainFront,
  ArrowRight, ChevronDown, Shield, Zap,
  MapPin, Clock, Users, X, Menu,
  Accessibility, Navigation, Volume2, LifeBuoy
} from 'lucide-react';
import './LandingPage.css';

const ACCESSIBILITY = [
  { label: '100% Step-Free', desc: 'Ramp & elevator routing', icon: Accessibility },
  { label: 'Live Lift Status', desc: 'Real-time out-of-order alerts', icon: Navigation },
  { label: 'Audio & Haptic', desc: 'Voice navigation & arrival cues', icon: Volume2 },
  { label: '1-Tap Escort', desc: 'On-demand station assistance', icon: LifeBuoy },
];

/* ── Features data ── */
const FEATURES = [
  {
    id: 'ai',
    Icon: Brain,
    title: 'AI-POWERED ROUTING',
    subtitle: 'Neural Path Intelligence',
    desc: 'Our deep-learning engine analyzes millions of data points in real-time — weather, congestion, incidents — to find paths humans miss.',
    color: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.3)',
    stat: '3x faster routes'
  },
  {
    id: 'bio',
    Icon: ScanFace,
    title: 'BIOMETRIC ACCESS',
    subtitle: 'Touch-Free, Secure Entry',
    desc: 'Walk right through. Face, fingerprint, and voice recognition grant instantaneous, frictionless access across all transit nodes.',
    color: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.3)',
    stat: '0.3s verification'
  },
  {
    id: 'transport',
    Icon: TrainFront,
    title: 'UNIFIED MOBILITY',
    subtitle: 'One Ticket. Every Mode.',
    desc: 'Monorails, autonomous pods, VTOLs, and road networks — all controlled from a single platform. Seamless transfers, zero friction.',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.3)',
    stat: '12 transport modes'
  },
  {
    id: 'shield',
    Icon: Shield,
    title: 'ENTERPRISE SECURITY',
    subtitle: 'Military-Grade Encryption',
    desc: 'End-to-end encrypted travel data, zero-knowledge proofs, and ISO 27001 certified infrastructure protect every journey.',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.3)',
    stat: '256-bit AES'
  },
];

/* ── Ticker messages ── */
const TICKER_MSGS = [
  '🚄 Monorail Line 4 — operating at peak efficiency',
  '⚡ High-speed lane B — clear for traffic',
  '🤖 AI routing engine — processing 2.4M requests/sec',
  '🛸 VTOL corridor Alpha — fully operational',
  '🌐 City network sync — 99.98% uptime',
  '🔋 Green energy grid — 100% renewable today',
];

/* ── Pre-calculate particles ── */
const STATIC_PARTICLES = Array.from({ length: 20 }).map(() => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${6 + Math.random() * 8}s`,
  width: `${2 + Math.random() * 3}px`,
  height: `${2 + Math.random() * 3}px`,
}));

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tickerIdx, setTickerIdx] = useState(0);
  const [showMindLink, setShowMindLink] = useState(false);
  const heroRef = useRef(null);

  /* Ticker rotation */
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_MSGS.length), 3000);
    return () => clearInterval(t);
  }, []);

  /* Parallax mouse tracking */
  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  return (
    <div className="lp-root">
      {/* ── Background with parallax ── */}
      <div className="lp-bg" style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px) scale(1.06)` }}>
        <img src="/images/bg.jpeg" alt="" />
        <div className="lp-bg-overlay" />
        <div className="lp-bg-vignette" />
      </div>

      {/* ── Floating Particles ── */}
      <div className="lp-particles" aria-hidden="true">
        {STATIC_PARTICLES.map((style, i) => (
          <div key={i} className="lp-particle" style={style} />
        ))}
      </div>

      {/* ── NAVIGATION ── */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          {/* Logo */}
          <div className="lp-logo">
            <img src="/images/logo.png" alt="ORIXA" className="lp-logo-img" />
          </div>

          {/* Desktop links */}
          <nav className="lp-nav-links" aria-label="Main navigation">
            {['Features', 'Technology', 'Use Cases', 'About', 'Partners'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="lp-nav-link">{link}</a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="lp-nav-right">
            {/* Status pill */}
            <div className="lp-status-pill">
              <div className="lp-pulse" />
              <span>29°C Colombo</span>
              <span className="lp-divider" />
              <span className="lp-status-text">City network operational</span>
            </div>
            <button className="lp-btn-ghost" onClick={() => navigate('/login')}>Log In</button>
            <button className="lp-btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
            {/* Mobile menu toggle */}
            <button className="lp-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lp-mobile-menu">
            {['Features', 'Technology', 'Use Cases', 'About', 'Partners'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="lp-mobile-link" onClick={() => setMenuOpen(false)}>{link}</a>
            ))}
            <div className="lp-mobile-actions">
              <button className="lp-btn-ghost w-full" onClick={() => navigate('/login')}>Log In</button>
              <button className="lp-btn-primary w-full" onClick={() => navigate('/signup')}>Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ── */}
      <section className="lp-hero" ref={heroRef}>
        {/* Glow orb behind card */}
        <div className="lp-hero-glow" style={{ transform: `translate(${parallaxX * 0.8}px, ${parallaxY * 0.8}px)` }} />

        <div className="lp-hero-card" style={{ transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)` }}>
          {/* Badge */}
          {/* <div className="lp-hero-badge">
            <Zap size={12} />
           
          </div> */}

          <div className="lp-hero-body">
            <div className="lp-hero-text">
              <h1 className="lp-hero-title">
                Reimagining<br/>
                <span className="lp-gradient-text">Urban Mobility.</span>
              </h1>
              <p className="lp-hero-sub">A Smarter Journey. A Brighter Tomorrow.</p>
              <p className="lp-hero-desc">
                Sign up to begin your personalized, AI-powered integrated transport experience across the city.
              </p>
              <div className="lp-hero-actions">
                <button className="lp-btn-unlock" onClick={() => navigate('/login')}>
                  Unlock Your Future
                  <ArrowRight size={18} />
                </button>
                <button className="lp-btn-connect" onClick={() => setShowMindLink(true)}>
                  <div className="lp-mind-icon"><Brain size={16} /></div>
                  <span>Connect with Mind</span>
                </button>
              </div>
              {/* Mini stats row */}
              <div className="lp-hero-mini-stats">
                <div className="lp-mini-stat"><MapPin size={14} /><span>48+ cities</span></div>
                <div className="lp-mini-stat"><Users size={14} /><span>2.4M+ commuters</span></div>
                <div className="lp-mini-stat"><Clock size={14} /><span>99.9% uptime</span></div>
              </div>
            </div>

            {/* Hero visual — robot interaction */}
            <div className="lp-hero-visual" style={{ transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)` }}>
              <div className="lp-visual-ring lp-ring-1" />
              <div className="lp-visual-ring lp-ring-2" />
              <div className="lp-visual-ring lp-ring-3" />
              <img src="/images/landing_robot.png" alt="AI Mobility Assistant" className="lp-robot-img" />
              {/* Floating holographic data tags */}
              <div className="lp-holo-tag lp-tag-1">
                <Zap size={10} />
                <span>Real-time sync</span>
              </div>
              <div className="lp-holo-tag lp-tag-2">
                <Shield size={10} />
                <span>Secured</span>
              </div>
              <div className="lp-holo-tag lp-tag-3">
                <Brain size={10} />
                <span>AI active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="lp-scroll-cue">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── ACCESSIBILITY SECTION ── */}
      <section className="lp-access-banner">
        <div className="lp-access-content">
          <div className="lp-access-header">
            <h2 className="lp-section-title" style={{ color: '#fff', textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>Mobility for Everyone</h2>
            <p className="lp-feature-desc" style={{ color: '#d5e2f2' }}>Our platform ensures seamless travel regardless of ability, integrating accessibility at every step.</p>
          </div>
          <div className="lp-access-grid">
            {ACCESSIBILITY.map((item) => (
              <div key={item.label} className="lp-access-card">
                <div className="lp-access-icon">
                  <item.icon size={28} />
                </div>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="lp-features-section" id="features">
        <div className="lp-section-label">CORE CAPABILITIES</div>
        <h2 className="lp-section-title">Everything you need to move smarter</h2>
        <div className="lp-features-grid">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className={`lp-feature-card ${activeFeature === f.id ? 'lp-feature-active' : ''}`}
              style={{ '--feature-color': f.color, '--feature-glow': f.glow }}
              onMouseEnter={() => setActiveFeature(f.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="lp-feature-icon-wrap">
                <f.Icon size={26} />
              </div>
              <div className="lp-feature-stat">{f.stat}</div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-subtitle">{f.subtitle}</p>
              <p className="lp-feature-desc">{f.desc}</p>
              <div className="lp-feature-arrow">
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="lp-cta-section" id="use-cases">
        <div className="lp-cta-glow" />
        <div className="lp-cta-content">
          <div className="lp-section-label">GET STARTED TODAY</div>
          <h2 className="lp-cta-title">Ready to transform your commute?</h2>
          <p className="lp-cta-desc">Join 2.4 million commuters who've already unlocked the future of urban transport.</p>
          <div className="lp-cta-actions">
            <button className="lp-btn-unlock large" onClick={() => navigate('/signup')}>
              Start Your Journey
              <ArrowRight size={20} />
            </button>
            <button className="lp-btn-ghost large" onClick={() => navigate('/login')}>
              Log In Instead
            </button>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="lp-ticker" role="status" aria-live="polite">
        <div className="lp-ticker-label">
          <div className="lp-pulse small" />
          Real-time City Sync
        </div>
        <div className="lp-ticker-separator" />
        <div className="lp-ticker-msg">{TICKER_MSGS[tickerIdx]}</div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-logo">
              <img src="/images/logo.png" alt="ORIXA" className="lp-logo-img small" />
            </div>
            <p>© 2024 ORIXA Networks. Re-imagining connectivity.</p>
          </div>
          <div className="lp-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* ── MIND LINK MODAL ── */}
      {showMindLink && (
        <div className="lp-modal-overlay" onClick={() => setShowMindLink(false)}>
          <div className="lp-modal" onClick={e => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => setShowMindLink(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="lp-modal-body">
              <Brain size={48} className="lp-modal-icon mind" />
              <h3>Connect with Mind</h3>
              <p>Link your mind to the ORIXA neural network and plan every journey at the speed of thought.</p>
              <div className="lp-modal-status">
                <div className="lp-pulse small" />
                <span className="lp-modal-status-text">Neural interface ready</span>
                <span className="lp-divider" />
                <span className="lp-modal-mode">Mode: Direct Interface</span>
              </div>
              <button className="lp-btn-unlock" onClick={() => { setShowMindLink(false); navigate('/login'); }}>
                Connect Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

