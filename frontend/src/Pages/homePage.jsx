import React, { useState } from 'react';
import './HomePage.css';

export default function HomePage() {
    const [activeNav, setActiveNav] = useState('home');
    const [activeTransport, setActiveTransport] = useState('bus');
    const [destination, setDestination] = useState('');

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
        <div className="app">
            {/* SIDEBAR */}
            <aside className="sidebar">
                {/* BRAND */}
                <div className="brand">
                    <div className="brand-icon"></div>
                    <span>ORIXA</span>
                </div>

                {/* NAVIGATION */}
                <nav className="navigation">
                    <a href="#" className={`nav-item ${activeNav === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('home'); }}>
                        <svg viewBox="0 0 24 24">
                            <path d="M3 10.5L12 3l9 7.5"></path>
                            <path d="M5 9.5V21h14V9.5"></path>
                            <path d="M9 21v-7h6v7"></path>
                        </svg>
                        <span>Home</span>
                    </a>
                    <a href="#" className={`nav-item ${activeNav === 'journey' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('journey'); }}>
                        <svg viewBox="0 0 24 24">
                            <circle cx="5" cy="19" r="2"></circle>
                            <circle cx="19" cy="5" r="2"></circle>
                            <path d="M7 19c6 0 4-10 10-14"></path>
                        </svg>
                        <span>Journey</span>
                    </a>
                    <a href="#" className={`nav-item ${activeNav === 'live-map' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('live-map'); }}>
                        <svg viewBox="0 0 24 24">
                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="2.5"></circle>
                        </svg>
                        <span>Live Map</span>
                    </a>
                    <a href="#" className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveNav('profile'); }}>
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"></path>
                        </svg>
                        <span>Profile</span>
                    </a>
                </nav>

                {/* AI ASSISTANT */}
                <div className="assistant-mini">
                    <div className="robot-small">
                        <div className="robot-face">
                            <i></i><i></i><span></span>
                        </div>
                    </div>
                    <div className="assistant-text">
                        <strong>AI Travel Assistant</strong>
                        <small>Always here to help</small>
                    </div>
                    <div className="assistant-arrow">›</div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="main">
                {/* HEADER */}
                <header className="topbar">
                    <div className="motto">
                        Smarter Journey.
                        <span>A Brighter Tomorrow.</span>
                    </div>
                    <div className="top-actions">
                        {/* WEATHER */}
                        <div className="weather">
                            <div className="weather-icon">☀</div>
                            <div>
                                <strong>28°C</strong>
                                <small>Colombo</small>
                            </div>
                            <span className="weather-cloud">☁</span>
                        </div>
                        {/* NETWORK */}
                        <div className="network">
                            <span className="pulse"></span>
                            City network operational
                        </div>
                        {/* NOTIFICATION */}
                        <button className="notification">
                            <svg viewBox="0 0 24 24">
                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                                <path d="M10 21h4"></path>
                            </svg>
                            <span></span>
                        </button>
                        {/* USER */}
                        <div className="user">
                            <div className="avatar">OB</div>
                            <div className="user-info">
                                <strong>Oshen Karunathilaka</strong>
                                <small>Traveler</small>
                            </div>
                            <span className="user-arrow">⌄</span>
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section className="hero">
                    {/* HERO CONTENT */}
                    <div className="hero-content">
                        <div className="hero-heading">
                            <span className="eyebrow">PERSONAL JOURNEY PLANNER</span>
                            <h1>Good morning, <span>Oshen</span></h1>
                            <p>Where do you want to go today?</p>
                        </div>
                        {/* SEARCH */}
                        <div className="search-container">
                            <div className="search-box">
                                <svg viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="7"></circle>
                                    <path d="m20 20-4-4"></path>
                                </svg>
                                <input
                                    id="destInput"
                                    type="text"
                                    placeholder="Search destination..."
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                                <button className="mic" onClick={handleVoice}>
                                    <svg viewBox="0 0 24 24">
                                        <rect x="9" y="3" width="6" height="12" rx="3"></rect>
                                        <path d="M5 11a7 7 0 0 0 14 0"></path>
                                        <path d="M12 18v3"></path>
                                        <path d="M9 21h6"></path>
                                    </svg>
                                </button>
                            </div>
                            {/* SEARCH ACTIONS */}
                            <div className="search-actions">
                                <button className="arrival">
                                    <svg viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="17" rx="3"></rect>
                                        <path d="M16 2v4"></path>
                                        <path d="M8 2v4"></path>
                                        <path d="M3 10h18"></path>
                                        <circle cx="12" cy="15" r="2"></circle>
                                    </svg>
                                    <span>
                                        <small>ARRIVAL TIME</small>
                                        Arrival by <strong>08:00 AM</strong>
                                    </span>
                                    <b>⌄</b>
                                </button>
                                <button className="plan-button" onClick={handlePlan}>
                                    Plan My Journey
                                    <span>→</span>
                                </button>
                            </div>
                        </div>

                        {/* TRANSPORT */}
                        <div className="transport-options">
                            <button className={`transport ${activeTransport === 'bus' ? 'active' : ''}`} onClick={() => setActiveTransport('bus')}>
                                <div className="transport-icon">🚌</div>
                                <span>Bus</span>
                            </button>
                            <button className={`transport ${activeTransport === 'train' ? 'active' : ''}`} onClick={() => setActiveTransport('train')}>
                                <div className="transport-icon">🚆</div>
                                <span>Train</span>
                            </button>
                            <button className={`transport ${activeTransport === 'air' ? 'active' : ''}`} onClick={() => setActiveTransport('air')}>
                                <div className="transport-icon">✈</div>
                                <span>Air</span>
                            </button>
                            <button className={`transport ${activeTransport === 'roads' ? 'active' : ''}`} onClick={() => setActiveTransport('roads')}>
                                <div className="transport-icon">🚗</div>
                                <span>Roads</span>
                            </button>
                        </div>
                    </div>

                    {/* FUTURISTIC CITY */}
                    <div className="city-visual">
                        <img src="/images/futuristic_city.png" alt="Futuristic City" className="city-bg-image" />
                        <div className="city-overlay"></div>
                        <div className="city-glow"></div>
                    </div>
                </section>

                {/* LOWER DASHBOARD */}
                <section className="dashboard-grid">
                    {/* RECENT JOURNEYS */}
                    <div className="glass-card recent">
                        <div className="card-header">
                            <div>
                                <span className="section-label">HISTORY</span>
                                <h2>Your Recent Journeys</h2>
                            </div>
                            <a href="#">
                                View all
                                <span>→</span>
                            </a>
                        </div>
                        
                        {/* JOURNEY 1 */}
                        <div className="journey-item">
                            <div className="journey-icon cyan">
                                <svg viewBox="0 0 24 24">
                                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                                    <circle cx="12" cy="10" r="2.5"></circle>
                                </svg>
                            </div>
                            <div className="journey-details">
                                <h3>KDU University</h3>
                                <p>
                                    <span>◷</span>
                                    8:00 AM
                                    <b>•</b>
                                    42 min
                                    <b>•</b>
                                    1 transfer
                                </p>
                            </div>
                            <button className="journey-arrow">→</button>
                        </div>
                        
                        {/* JOURNEY 2 */}
                        <div className="journey-item">
                            <div className="journey-icon dark">
                                <svg viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="8"></circle>
                                    <path d="M12 8v5l3 2"></path>
                                </svg>
                            </div>
                            <div className="journey-details">
                                <h3>Colombo Fort</h3>
                                <p>
                                    <span>◷</span>
                                    6:30 PM
                                    <b>•</b>
                                    28 min
                                    <b>•</b>
                                    Direct
                                </p>
                            </div>
                            <button className="journey-arrow">→</button>
                        </div>
                    </div>

                    {/* AI ASSISTANT */}
                    <div className="glass-card ai-card">
                        {/* AI VISUAL */}
                        <div className="ai-visual">
                            <div className="ai-orbit orbit-one"></div>
                            <div className="ai-orbit orbit-two"></div>
                            
                            {/* WAVE */}
                            <div className="ai-wave">
                                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                            
                            {/* ROBOT */}
                            <div className="ai-robot">
                                <div className="robot-ring">
                                    <div className="robot-face-large">
                                        <div className="robot-eyes"><i></i><i></i></div>
                                        <div className="robot-mouth"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* MINI MAGLEV */}
                            <div className="mini-maglev">
                                <div></div>
                            </div>
                        </div>

                        {/* AI TEXT */}
                        <div className="ai-content">
                            <span className="section-label">ORIXA AI</span>
                            <h2>Let ORIXA<br/>plan it for you</h2>
                            <p>Tell us your destination and we'll find the best route, in real-time.</p>
                            <button className="voice-button" onClick={handleVoice}>
                                <svg viewBox="0 0 24 24">
                                    <rect x="9" y="3" width="6" height="12" rx="3"></rect>
                                    <path d="M5 11a7 7 0 0 0 14 0"></path>
                                    <path d="M12 18v3"></path>
                                    <path d="M9 21h6"></path>
                                </svg>
                                Try Voice Search
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
