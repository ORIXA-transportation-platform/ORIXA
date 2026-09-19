import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, ChevronDown, MapPin, Footprints, Bus, Train, ArrowRight, Shuffle, Armchair, Volume2, Type, CheckCircle2, ChevronUp, ChevronRight, Menu } from 'lucide-react';
import './HomePage.css';
import './JourneyPage.css';

export default function JourneyPage() {
    const [activeNav, setActiveNav] = useState('journey');
    const [explainerOpen, setExplainerOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="app-container">
            {/* MOBILE OVERLAY */}
            <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

            {/* SIDEBAR NAVIGATION */}
            <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
                <div className="brand">
                    <img src="/images/logo.png" alt="ORIXA Logo" className="brand-icon-img" />
                </div>
                <nav className="nav-menu">
                    <Link to="/home" className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-7h6v7"></path></svg>
                        <span>Home</span>
                    </Link>
                    <Link to="/journey" className={`nav-item ${activeNav === 'journey' ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24"><circle cx="5" cy="19" r="2"></circle><circle cx="19" cy="5" r="2"></circle><path d="M7 19c6 0 4-10 10-14"></path></svg>
                        <span>Journey</span>
                    </Link>
                    <Link to="/live-map" className={`nav-item ${activeNav === 'live-map' ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
                        <span>Live Map</span>
                    </Link>
                    <Link to="/profile" className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"></path></svg>
                        <span>Profile</span>
                    </Link>
                </nav>
                <div className="ai-assistant-mini">
                    <img src="/images/ai_robot.png" alt="AI Robot" style={{ objectFit: 'cover' }} />
                    <div className="ai-mini-text">
                        <strong>AI Travel Assistant</strong>
                        <small>Always here to help</small>
                    </div>
                    <ArrowRight size={14} className="ai-mini-arrow" />
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="journey-content">
                
                {/* HEADER */}
                <div className="journey-header">
                    <div className="jh-left">
                        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <button className="back-btn" onClick={() => window.history.back()}>
                            <ArrowLeft size={20} />
                        </button>
                        <h1>Journey Details</h1>
                    </div>
                    <div className="top-controls" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <div className="weather-pill">
                            <span className="weather-icon">🌤️</span>
                            <div className="weather-text">
                                <strong>28°C</strong>
                                <small>Colombo</small>
                            </div>
                        </div>
                        <div className="network-pill">
                            <div className="network-dot"></div>
                            City network operational
                        </div>
                        <div style={{ width: '20px' }}></div>
                        <button className="bell-btn">
                            <Bell />
                        </button>
                        <div className="profile-pill">
                            <div className="avatar">OK</div>
                            <span>Oshen Karunathilaka</span>
                            <ChevronDown />
                        </div>
                    </div>
                </div>

                {/* JOURNEY GRID */}
                <div className="journey-grid">
                    
                    {/* LEFT COLUMN */}
                    <div className="j-col-left">
                        
                        {/* DESTINATION SUMMARY */}
                        <div className="journey-summary-card">
                            <div className="summary-top">
                                <div className="dest-details">
                                    <div className="dest-icon">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="dest-text">
                                        <h2>KDU University</h2>
                                        <p>Kandawala Road, Ratmalana</p>
                                    </div>
                                </div>
                                <div className="eta-badge">
                                    <h3>Arrive by 7:42 PM</h3>
                                    <div className="ai-confidence">
                                        ✨ 97% confidence
                                    </div>
                                </div>
                            </div>
                            <div className="optimization-banner">
                                <div className="opt-left">
                                    <span className="opt-glow-tag">JOURNEY OPTIMIZED</span>
                                    <span className="opt-stats">42 min • 2 transfers</span>
                                </div>
                                <a href="#" className="opt-link">Why this route? <ArrowRight size={14} /></a>
                            </div>
                        </div>

                        {/* TIMELINE */}
                        <div className="timeline-container">
                            
                            {/* Node 1: Walking */}
                            <div className="timeline-item">
                                <div className="timeline-visual">
                                    <div className="t-node cyan"><Footprints /></div>
                                    <div className="t-line cyan"></div>
                                </div>
                                <div className="timeline-content">
                                    <h4>Your Location</h4>
                                    <p>4 min walk • 320 m</p>
                                    <a href="#" style={{ color: '#14E1FF', fontSize: '13px', textDecoration: 'none' }}>View map {'>'}</a>
                                </div>
                            </div>

                            {/* Node 2: Bus */}
                            <div className="timeline-item">
                                <div className="timeline-visual">
                                    <div className="t-node cyan"><Bus /></div>
                                    <div className="t-line cyan"></div>
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

                            {/* Node 3: Transfer Hub */}
                            <div className="timeline-item">
                                <div className="timeline-visual">
                                    <div className="t-node dark"><MapPin size={12} /></div>
                                    <div className="t-line dotted"></div>
                                    <div className="t-node dark" style={{ marginTop: '8px' }}><MapPin size={12} /></div>
                                    <div className="t-line dotted"></div>
                                </div>
                                <div className="timeline-content">
                                    <h4>Intermodal Transfer Hub</h4>
                                    <p>2 min transfer • Station map • Accessible from Platform B</p>
                                </div>
                            </div>

                            {/* Node 4: Rail */}
                            <div className="timeline-item">
                                <div className="timeline-visual">
                                    <div className="t-node purple"><Train /></div>
                                </div>
                                <div className="timeline-content">
                                    <h4>Autonomous Rail (Rail 07)</h4>
                                    <div className="t-meta" style={{ marginBottom: '8px' }}>
                                        <span className="status-pill" style={{ color: '#8B5CF6', background: 'rgba(139, 92, 246, 0.1)' }}>Connection secured</span>
                                    </div>
                                    <p>21 min transit time</p>
                                </div>
                            </div>

                            <button className="start-journey-btn">
                                Start Journey <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="j-col-right">
                        
                        {/* PREVIEW & MATRIX */}
                        <div className="preview-card">
                            <h3>Journey Preview</h3>
                            <div className="schematic">
                                <div className="sch-step">
                                    <div className="sch-icon"><Footprints size={16}/></div>
                                    <span className="sch-label">Walk</span>
                                </div>
                                <div className="sch-connector">
                                    <span className="sch-connector-line"></span>
                                    <ChevronRight size={16} color="#6B8FB5"/>
                                </div>
                                <div className="sch-step">
                                    <div className="sch-icon"><Bus size={16}/></div>
                                    <span className="sch-label">Bus</span>
                                </div>
                                <div className="sch-connector">
                                    <span className="sch-connector-line"></span>
                                    <ChevronRight size={16} color="#6B8FB5"/>
                                </div>
                                <div className="sch-step">
                                    <div className="sch-icon" style={{ background: '#1C153B', color: '#8B5CF6' }}><Train size={16}/></div>
                                    <span className="sch-label">Rail</span>
                                </div>
                            </div>
                            <div className="duration-matrix">
                                <div className="d-item"><span>Walk</span><strong>4 min</strong></div>
                                <div className="d-item"><span>Bus</span><strong>12 min</strong></div>
                                <div className="d-item"><span>Rail</span><strong>21 min</strong></div>
                                <div className="d-item d-total"><span>Total</span><strong>42 min</strong></div>
                            </div>
                        </div>

                        {/* PREFERENCES */}
                        <div className="preferences-bar">
                            <button className="pref-pill"><Shuffle size={14}/> Fewer transfers</button>
                            <button className="pref-pill active"><Armchair size={14}/> More comfort</button>
                            <button className="pref-pill"><Volume2 size={14}/> Visual + Audio</button>
                            <button className="pref-pill"><Type size={14}/> Large text / AI</button>
                        </div>

                        {/* EXPLAINER CARD */}
                        <div className="explainer-card">
                            <div className="exp-header" style={{ cursor: 'pointer' }} onClick={() => setExplainerOpen(!explainerOpen)}>
                                <h3>✨ Why this route?</h3>
                                <ChevronUp size={20} color="#6B8FB5" style={{ transform: explainerOpen ? 'rotate(0)' : 'rotate(180deg)', transition: '0.2s' }} />
                            </div>
                            
                            {explainerOpen && (
                                <div className="exp-content">
                                    <div className="check-list">
                                        <div className="check-item"><CheckCircle2 /> Lowest congestion</div>
                                        <div className="check-item"><CheckCircle2 /> Short transfer distance</div>
                                        <div className="check-item"><CheckCircle2 /> Your travel level preference</div>
                                        <div className="check-item"><CheckCircle2 /> High vehicle availability</div>
                                    </div>
                                    <div className="city-image-card">
                                        <img src="/images/green_transit.png" alt="Transit Corridor" />
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
        </div>
    );
}
