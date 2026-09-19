import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Search, Bell, ChevronDown, ArrowRight, Fingerprint, 
    X, Train, MapPin, Zap, AlertCircle, Leaf, ShieldCheck, 
    Settings, Settings2, Sliders, ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css';
import './ProfilePage.css';

const commuteData = [
    { name: 'Sun', distance: 12 },
    { name: 'Mon', distance: 45 },
    { name: 'Tue', distance: 38 },
    { name: 'Wed', distance: 52 },
    { name: 'Thu', distance: 40 },
    { name: 'Fri', distance: 25 },
    { name: 'Sat', distance: 15 },
];

export default function ProfilePage() {
    const [activeNav, setActiveNav] = useState('profile');
    const [subTab, setSubTab] = useState('Overview');

    return (
        <div className="app-container">
            {/* SIDEBAR NAVIGATION */}
            <aside className="sidebar">
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

            {/* MAIN CONTENT WORKSPACE */}
            <main className="profile-content">
                
                {/* HEADER */}
                <div className="profile-header">
                    <div className="search-bar-container">
                        <Search size={18} color="#6B8FB5" />
                        <input type="text" placeholder="Search preferences, vehicles..." />
                    </div>

                    <div className="top-controls" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <div className="network-pill">
                            <div className="network-dot" style={{ background: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
                            City network operational
                        </div>
                        <div className="weather-pill">
                            <span className="weather-icon">🌤️</span>
                            <div className="weather-text">
                                <strong>28°C</strong>
                                <small>Colombo</small>
                            </div>
                        </div>
                        <button className="bell-btn">
                            <Bell size={18} />
                        </button>
                        <div className="profile-pill">
                            <div className="avatar" style={{ background: '#8B5CF6', color: '#FFF' }}>OK</div>
                            <span>Oshen Karunathilaka</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </div>

                {/* GRID LAYOUT */}
                <div className="profile-grid">
                    
                    {/* LEFT COLUMN: IDENTITY & WORKSPACE */}
                    <div className="pg-left">
                        
                        {/* USER BANNER */}
                        <div className="user-identity-banner">
                            <div className="avatar-wrapper">
                                <img src="/images/avatar_portrait.png" alt="User" className="avatar-large" />
                                <div className="avatar-status-dot"></div>
                            </div>
                            <div className="user-info">
                                <h1>Oshen Karunathilaka</h1>
                                <div className="user-tier">Pro Commuter | Level 24</div>
                                
                                <div className="kpi-strip">
                                    <div className="kpi-item">
                                        <span>Total Distance</span>
                                        <strong className="cyan">34,500 km</strong>
                                    </div>
                                    <div className="kpi-item">
                                        <span>Time Saved</span>
                                        <strong>112 hrs</strong>
                                    </div>
                                    <div className="kpi-item">
                                        <span>Carbon Avoided</span>
                                        <strong>1.5 Tons</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUB NAV */}
                        <div className="profile-sub-nav">
                            {['Overview', 'Identity', 'Vehicle Access', 'Preferences', 'Settings'].map(tab => (
                                <div 
                                    key={tab} 
                                    className={`sub-nav-item ${subTab === tab ? 'active' : ''}`}
                                    onClick={() => setSubTab(tab)}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>

                        {/* AUTH CARDS */}
                        <div className="auth-grid">
                            <div className="auth-card">
                                <div className="auth-icon-wrap" style={{ background: 'rgba(20, 225, 255, 0.1)', color: '#14E1FF' }}>
                                    <Fingerprint size={32} />
                                </div>
                                <div className="auth-text">
                                    <h3>Biometric Status</h3>
                                    <div className="auth-status cyan">
                                        <ShieldCheck size={14} /> Secure
                                    </div>
                                </div>
                            </div>
                            <div className="auth-card">
                                <div className="auth-icon-wrap">
                                    <img src="/images/neural_hologram.png" alt="Neural" />
                                </div>
                                <div className="auth-text">
                                    <h3>MindLink Connect</h3>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#94A3B8' }}>Mode: Direct Interface</p>
                                    <div className="auth-status">
                                        <div className="network-dot" style={{ background: '#10B981', boxShadow: 'none' }}></div> 
                                        Connected
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VEHICLE ACCESS */}
                        <div className="section-title">Personal Vehicle & Pod Access</div>
                        <div className="vehicle-manager">
                            <div className="vehicle-card">
                                <div className="vc-left">
                                    <img src="/images/train_pod.png" alt="Train" className="vc-thumb" />
                                    <div className="vc-info">
                                        <h4>RAIL 07</h4>
                                        <p>Access Keys: Active</p>
                                    </div>
                                </div>
                                <div className="vc-right">
                                    <div className="vc-seat" onClick={() => alert('Opening seat configuration...')}>Seat 3A - Quiet Zone <ChevronDown size={14}/></div>
                                    <button className="vc-eject" onClick={() => alert('Access Revoked!')}><X size={16}/></button>
                                </div>
                            </div>
                            <div className="vehicle-card">
                                <div className="vc-left">
                                    <div className="vc-thumb" style={{ background: '#0B1933', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1D3A6B' }}>
                                        <MapPin color="#14E1FF" />
                                    </div>
                                    <div className="vc-info">
                                        <h4>POD 14</h4>
                                        <p>Access Keys: Active</p>
                                    </div>
                                </div>
                                <div className="vc-right">
                                    <div className="vc-seat" onClick={() => alert('Opening pod configuration...')}>Default Layout <ChevronDown size={14}/></div>
                                    <button className="vc-eject" onClick={() => alert('Access Revoked!')}><X size={16}/></button>
                                </div>
                            </div>
                        </div>

                        {/* PREFERENCES ACTION STRIP */}
                        <div className="action-strip">
                            <div className="action-tile" onClick={() => alert('Changing preferred mode...')}>
                                <div className="at-header"><span>Preferred Mode</span> <Train size={16}/></div>
                                <div className="at-value">Rail</div>
                            </div>
                            <div className="action-tile" onClick={() => alert('Updating accessibility settings...')}>
                                <div className="at-header"><span>Accessibility</span> <AlertCircle size={16}/></div>
                                <div className="at-value">None</div>
                            </div>
                            <div className="action-tile" onClick={() => alert('Toggling alerts...')}>
                                <div className="at-header"><span>Alerts</span> <Bell size={16}/></div>
                                <div className="at-value">Enabled</div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: ANALYTICS RAIL */}
                    <div className="pg-right analytics-rail">
                        
                        {/* Personal Achievement */}
                        <div className="ar-card ach-card">
                            <div className="ach-icon"><Leaf size={24} /></div>
                            <h3>Sustainability Milestone Reached!</h3>
                            <p>150 low-impact trips completed.</p>
                            <button className="ach-btn" onClick={() => alert('Loading sustainability badges...')}>View badges</button>
                        </div>

                        {/* Travel Journal */}
                        <div className="ar-card">
                            <div className="ar-card-title">Travel Journal</div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={commuteData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B8FB5', fontSize: 11 }} />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(20, 225, 255, 0.1)' }}
                                            contentStyle={{ background: 'rgba(10, 20, 42, 0.9)', border: '1px solid #14E1FF', borderRadius: '8px' }}
                                        />
                                        <Bar dataKey="distance" fill="#14E1FF" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="top-dest">
                                <div className="top-dest-icon"><MapPin size={18} /></div>
                                <div className="top-dest-text">
                                    <p>Most Visited</p>
                                    <h4>KDU University (5 trips)</h4>
                                </div>
                            </div>
                        </div>

                        {/* Comfort & Safety */}
                        <div className="ar-card">
                            <div className="ar-card-title">Comfort & Safety Status</div>
                            <div className="diag-list">
                                <div className="diag-item">
                                    <span>In-Vehicle Air Quality</span>
                                    <strong className="green">Excellent</strong>
                                </div>
                                <div className="diag-item">
                                    <span>Personal Safety Check</span>
                                    <strong className="green">Clear</strong>
                                </div>
                                <div className="diag-item">
                                    <span>Route Stability</span>
                                    <strong><ShieldCheck size={14} color="#10B981" /> Verified</strong>
                                </div>
                            </div>
                            <div className="mood-select" onClick={() => alert('Opening lighting settings...')}>
                                Preferred Lighting: Warm Ambient
                                <ChevronDown size={14} color="#6B8FB5" />
                            </div>
                        </div>

                        {/* Sustainable Goals */}
                        <div className="ar-card">
                            <div className="ar-card-title">Personal Sustainable Goals</div>
                            <div className="goal-stat">
                                <h2>65%</h2>
                                <span>achieved</span>
                            </div>
                            <div className="goal-bar-bg">
                                <div className="goal-bar-fill"></div>
                            </div>
                            <div className="goal-next">
                                <Leaf size={14} /> Next goal: Plant 5 virtual trees
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
