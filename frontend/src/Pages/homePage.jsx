import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mic, Calendar, ChevronDown, Bell, MapPin, Clock, ArrowRight, ChevronRight, Bus, Train, Plane, Car, Menu } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
    const [activeNav, setActiveNav] = useState('home');
    const [activeTransport, setActiveTransport] = useState('bus');
    const [destination, setDestination] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlePlan = () => {
        if (!destination.trim()) {
            const input = document.getElementById('destInput');
            if (input) {
                input.focus();
                input.placeholder = "Enter a destination first...";
            }
            return;
        }
        alert("ORIXA is planning your journey to " + destination + "...");
    };

    const handleVoice = () => {
        if ("webkitSpeechRecognition" in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = "en-US";
            recognition.start();
            recognition.onresult = event => {
                setDestination(event.results[0][0].transcript);
            };
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

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
                    <ChevronRight size={14} className="ai-mini-arrow" />
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <div className="bg-image-container">
                    <img src="/images/futuristic_city.png" alt="Background" className="bg-image" />
                    <div className="bg-overlay"></div>
                </div>

                <div className="content-wrapper">
                    {/* HEADER */}
                    <div className="header-row">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
                                <Menu size={24} />
                            </button>
                            <div className="welcome-text">
                                <div className="motto">AI-DRIVEN COMMUTE</div>
                                <h1>Welcome back, Oshen</h1>
                                <div className="question">Where are we optimizing your travel to today?</div>
                            </div>
                        </div>
                        <div className="top-controls">
                            <div className="controls-row-1">
                                <button className="bell-btn">
                                    <Bell />
                                </button>
                                <div className="profile-pill">
                                    <div className="avatar">OB</div>
                                    <span>Oshen Karunatilaka</span>
                                    <ChevronDown />
                                </div>
                            </div>
                            <div className="controls-row-2">
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
                            </div>
                        </div>
                    </div>

                    {/* SEARCH */}
                    <div className="search-container">
                        <div className="search-bar">
                            <Search />
                            <input 
                                id="destInput"
                                type="text" 
                                placeholder="Search destination..." 
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            <Mic style={{ cursor: 'pointer', color: '#557AA3' }} onClick={handleVoice} />
                        </div>
                        <div className="search-actions">
                            <button className="arrival-btn">
                                <div className="arrival-info">
                                    <Calendar />
                                    <div className="arrival-text">
                                        <small>Arrival by</small>
                                        <strong>08:00 AM</strong>
                                    </div>
                                </div>
                                <ChevronDown />
                            </button>
                            <button className="plan-btn" onClick={handlePlan}>
                                Plan My Journey
                                <ArrowRight />
                            </button>
                        </div>
                    </div>

                    {/* TRANSPORT */}
                    <div className="transport-toggles">
                        <button className={`transport-btn ${activeTransport === 'bus' ? 'active' : ''}`} onClick={() => setActiveTransport('bus')}>
                            <Bus />
                            <span>Bus</span>
                        </button>
                        <button className={`transport-btn ${activeTransport === 'train' ? 'active' : ''}`} onClick={() => setActiveTransport('train')}>
                            <Train />
                            <span>Train</span>
                        </button>
                        <button className={`transport-btn ${activeTransport === 'air' ? 'active' : ''}`} onClick={() => setActiveTransport('air')}>
                            <Plane />
                            <span>Air</span>
                        </button>
                        <button className={`transport-btn ${activeTransport === 'roads' ? 'active' : ''}`} onClick={() => setActiveTransport('roads')}>
                            <Car />
                            <span>Roads</span>
                        </button>
                    </div>

                    {/* DASHBOARD CARDS */}
                    <div className="dashboard-cards">
                        {/* RECENT JOURNEYS */}
                        <div className="glass-card">
                            <div className="card-header">
                                <h2>Your Recent Journeys</h2>
                                <a href="#">View all <ChevronRight size={14} /></a>
                            </div>
                            <div className="journey-list">
                                <div className="journey-item">
                                    <div className="journey-icon blue">
                                        <MapPin size={22} />
                                    </div>
                                    <div className="journey-info">
                                        <h3>KDU University</h3>
                                        <p>
                                            <Clock size={12} /> 8:00 AM • <Clock size={12} /> 42 min • 1 transfer
                                        </p>
                                    </div>
                                    <ChevronRight />
                                </div>
                                <div className="journey-item">
                                    <div className="journey-icon gray">
                                        <Clock size={22} />
                                    </div>
                                    <div className="journey-info">
                                        <h3>Colombo Fort</h3>
                                        <p>
                                            <Clock size={12} /> 6:30 PM • <Clock size={12} /> 28 min • Direct
                                        </p>
                                    </div>
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>

                        {/* AI CARD */}
                        <div className="glass-card ai-card">
                            <div className="ai-image-bg" style={{ backgroundImage: "url('/images/ai_robot.png')" }}></div>
                            <div className="ai-card-content">
                                <h2>Let ORIXA plan it for you</h2>
                                <p>Tell us your destination and we'll find the best route, in real-time.</p>
                                <button className="voice-btn" onClick={handleVoice}>
                                    <Mic size={16} />
                                    Try Voice Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
