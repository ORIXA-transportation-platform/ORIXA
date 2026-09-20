import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, KeyRound, Eye, EyeOff, ScanFace, Mic, HeartPulse } from "lucide-react";
import "./loginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary fake login (no backend yet)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    navigate("/home");
  };

  return (
    <div className="login-page">
      {/* Full-bleed background */}
      <img src="/images/city-dusk.png" alt="" className="login-bg-image" />
      <div className="login-bg-overlay" />

      {/* Centered card */}
      <div className="login-card">
        <div className="login-brand">
          <img src="/images/logo.png" alt="ORIXA Logo" className="login-brand-icon" />
          <span>ORIXA</span>
        </div>

        <h1>Welcome back to ORIXA</h1>
        <p className="login-subtitle">Sign in to continue your smart journey.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <User size={17} className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <KeyRound size={17} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <div className="forgot-row">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-submit-btn">
            Log In
          </button>
        </form>

        <div className="biometric-section">
          <p className="biometric-title">Secure Biometric Login</p>
          <div className="biometric-options">
            <button type="button" className="biometric-btn">
              <ScanFace size={20} />
              <span>Face ID</span>
            </button>
            <button type="button" className="biometric-btn">
              <Mic size={20} />
              <span>Voice ID</span>
            </button>
            <button type="button" className="biometric-btn">
              <HeartPulse size={20} />
              <span>Heartbeat</span>
            </button>
          </div>
        </div>

        <div className="divider-row">
          <span>or sign in with</span>
        </div>

        <div className="social-row">
          <button type="button" className="social-btn" aria-label="Sign in with Google">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.6-2.6C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.7 6.5 2.7 11.6S6.9 21 12 21c6.9 0 9.6-4.8 9.6-7.3 0-.5-.05-.9-.1-1.3H12z"/>
            </svg>
          </button>
          <button type="button" className="social-btn" aria-label="Sign in with Apple">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
              <path d="M16.3 1.7c.1 1.1-.3 2.2-1 3-.7.8-1.8 1.5-2.9 1.4-.1-1.1.4-2.2 1-3 .8-.9 2-1.5 2.9-1.4zm3.4 16.4c-.5 1.1-.8 1.6-1.5 2.5-1 1.4-2.3 3.1-4 3.1-1.5 0-1.9-.9-3.9-.9s-2.5.9-4 .9c-1.7 0-3-1.6-4-3-2-2.9-3.5-8.1-1.5-11.6 1-1.7 2.7-2.8 4.6-2.9 1.5 0 2.9.9 3.9.9s2.7-1.1 4.5-1c.8 0 3 .3 4.4 2.3-.1.1-2.6 1.5-2.6 4.6 0 3.6 3.2 4.9 3.2 4.9z"/>
            </svg>
          </button>
          <button type="button" className="social-btn" aria-label="Sign in with LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#0A66C2" d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.7A1.7 1.7 0 1 1 8.2 7a1.7 1.7 0 0 1-1.7 1.7zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.2h.04a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.6z"/>
            </svg>
          </button>
        </div>

        <p className="signup-row">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;