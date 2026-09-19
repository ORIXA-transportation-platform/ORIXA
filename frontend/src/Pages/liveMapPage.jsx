import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, Bell, ChevronDown, MapPin, Bus, Train, Plane, Car, 
    ArrowRight, AlertTriangle, CheckCircle, Leaf, Compass, ShieldCheck, X, Menu 
} from 'lucide-react';
import './HomePage.css';
import './LiveMapPage.css';

export default function LiveMapPage() {
    const [activeNav, setActiveNav] = useState('live-map');
    
    // Map toggles state
    const [toggles, setToggles] = useState({
        bus: false,
        train: true,
        air1: false,
        air2: false,
        roads: false
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="map-page-wrapper">
            
            {/* BACKGROUND MAP CANVAS */}
            <div className="map-canvas-bg">
                <div className="map-canvas-overlay"></div>
                
                {/* Simulated Live Waypoints on Map */}
                
                {/* KDU University Pin */}
                <div className="map-pin" style={{ top: '35%', left: '60%' }}>
                    <div className="pin-icon-circle"><MapPin size={14} /></div>
                    KDU University
                </div>

                {/* You Are Here */}
                <div className="you-are-here-marker" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div className="map-pin" style={{ position: 'relative', top: '-25px' }}>
                        <div className="pin-icon-circle"><MapPin size={14} /></div>
                        You are here
                    </div>
                    <div className="orb-glow"></div>
                </div>

                {/* Train Pin 1 */}
                <div className="map-pin train-pin" style={{ top: '45%', left: '25%' }}>
                    <div className="pin-icon-circle"><Train size={14} /></div>
                    <div>
                        <p>Autonomous Rail 07</p>
                        <small>4 min to next stop</small>
                    </div>
                </div>

                {/* Train Thumbnail floating */}
                <img src="/images/train_pod.png" alt="Train" className="floating-train-pod" style={{ top: '48%', left: '35%' }} />

            </div>

            {/* MOBILE OVERLAY */}
            <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

            {/* SIDEBAR NAVIGATION */}
            <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`} style={{ zIndex: 100 }}>
                <div className="brand">
                    <img src="/images/logo.png" alt="ORIXA Logo" className="brand-icon-img" />
                </div>
                <nav className="nav-menu">
                    <Link to="/home" className={`nav-item ${activeNav === 'home' ? 'active' : ''}`} onClick={() => setActiveNav('home')}>
                        <svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-7h6v7"></path></svg>
                        <span>Home</span>
                    </Link>
                    <Link to="/journey" className={`nav-item ${activeNav === 'journey' ? 'active' : ''}`} onClick={() => setActiveNav('journey')}>
                        <svg viewBox="0 0 24 24"><circle cx="5" cy="19" r="2"></circle><circle cx="19" cy="5" r="2"></circle><path d="M7 19c6 0 4-10 10-14"></path></svg>
                        <span>Journey</span>
                    </Link>
                    <Link to="/live-map" className={`nav-item ${activeNav === 'live-map' ? 'active' : ''}`} onClick={() => setActiveNav('live-map')}>
                        <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
                        <span>Live Map</span>
                    </Link>
                    <Link to="/profile" className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={() => setActiveNav('profile')}>
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

            {/* HUD OVERLAY LAYER */}
            <div className="hud-layer">
                
                {/* HEADER ROW */}
                <div className="map-header">
                    <div className="map-title-row">
                        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <button className="back-btn-map" onClick={() => window.history.back()}>
                            <ArrowLeft size={20} />
                        </button>
                        <h1>Live Map</h1>
                        <div className="live-badge">
                            <div className="live-dot"></div> Live
                        </div>
                    </div>

                    <div className="hud-top-right">
                        <div className="network-pill" style={{ pointerEvents: 'auto' }}>
                            <div className="network-dot" style={{ background: '#10B981', boxShadow: 'none' }}></div>
                            City network operational
                        </div>
                        <div className="weather-pill" style={{ pointerEvents: 'auto' }}>
                            <span className="weather-icon">🌤️</span>
                            <div className="weather-text">
                                <strong>28°C</strong>
                                <small>Colombo</small>
                            </div>
                        </div>
                        <button className="bell-btn" style={{ pointerEvents: 'auto' }}>
                            <Bell size={18} />
                        </button>
                        <div className="profile-pill" style={{ pointerEvents: 'auto' }}>
                            <div className="avatar" style={{ background: '#8B5CF6', color: '#FFF' }}>OK</div>
                            <span>Oshen Karunathilaka</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </div>

                {/* LEFT FLOATING MAP CONTROLS */}
                <div className="map-controls-left">
                    <div className="layer-toggles-container">
                        <div className={`map-control-btn ${toggles.bus ? 'active' : ''}`} onClick={() => handleToggle('bus')}>
                            <Bus size={18} /> Bus
                        </div>
                        <div className={`map-control-btn ${toggles.train ? 'active' : ''}`} onClick={() => handleToggle('train')}>
                            <Train size={18} /> Train
                        </div>
                        <div className={`map-control-btn ${toggles.air1 ? 'active' : ''}`} onClick={() => handleToggle('air1')}>
                            <Plane size={18} /> Air
                        </div>
                        <div className={`map-control-btn ${toggles.air2 ? 'active' : ''}`} onClick={() => handleToggle('air2')}>
                            <Plane size={18} /> Air
                        </div>
                        <div className={`map-control-btn ${toggles.roads ? 'active' : ''}`} onClick={() => handleToggle('roads')}>
                            <Car size={18} /> Roads
                        </div>
                    </div>
                    <div className="compass-btn">
                        <Compass size={20} style={{ transform: 'rotate(45deg)' }} />
                    </div>
                </div>

                {/* RIGHT TELEMETRY PANELS */}
                <div className="telemetry-column">
                    
                    {/* A. Journey Update (Purple) */}
                    <div className="tele-card card-purple">
                        <div className="ju-top">
                            <div className="ju-icon"><AlertTriangle size={20} /></div>
                            <div className="ju-text">
                                <small>Journey Update</small>
                                <h3>Rail disruption detected</h3>
                                <p>Your journey has been detected.</p>
                            </div>
                            <div className="ju-close"><X size={16} /></div>
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
                                <button className="btn-view-changes">View changes</button>
                            </div>
                        </div>
                    </div>

                    {/* B. Train Telemetry */}
                    <div className="tele-card">
                        <div className="train-header">
                            <div className="th-left">
                                <h3>Autonomous Rail 07</h3>
                                <div className="th-status">
                                    <CheckCircle size={14} /> Moving normally
                                </div>
                            </div>
                            <div className="th-right">
                                <img src="/images/train_pod.png" alt="Train" />
                            </div>
                        </div>
                        <div className="train-mid">
                            <div className="tm-left">
                                <small>Next stop</small>
                                <div>Central Hub</div>
                            </div>
                            <div className="tm-right">4 min</div>
                        </div>
                        <div className="train-scrubber">
                            <div className="ts-bar">
                                <div className="ts-fill"></div>
                                <div className="ts-dot"></div>
                            </div>
                            <div className="ts-labels">
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
                                <div className="gh-icon"><ShieldCheck size={24} /></div>
                                <div className="gh-text">
                                    <h3>Journey Guardian</h3>
                                    <p>Your travel congestion</p>
                                </div>
                            </div>
                            <div className="gh-badge">
                                <CheckCircle size={12} /> All good
                            </div>
                        </div>
                        <div className="check-list-g">
                            <div className="c-item"><CheckCircle size={16} /> Route stable</div>
                            <div className="c-item"><CheckCircle size={16} /> Your usual travel preference</div>
                            <div className="c-item"><CheckCircle size={16} /> High vehicle availability</div>
                        </div>
                    </div>

                    {/* D. Journey Impact */}
                    <div className="tele-card">
                        <div className="impact-header">
                            <div className="impact-icon"><Leaf size={28} /></div>
                            <div className="impact-text">
                                <p>Your Journey Impact</p>
                                <h2>Low impact</h2>
                            </div>
                        </div>
                        <div className="impact-sub">
                            12% less energy than fastest route
                        </div>
                        <div className="impact-bar">
                            <div className="impact-fill"></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
