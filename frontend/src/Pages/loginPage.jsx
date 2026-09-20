import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Key, Eye, EyeOff, Smartphone, Mic, Heart } from "lucide-react";
import "./loginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("admin@orixa.network");
  const [password, setPassword] = useState("admin123");
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

      <img src="/images/city-dusk.png" alt="" className="login-bg-image" />
      <div className="login-bg-overlay" />

      {/* Centered card */}
      <div className="login-card">
        <Link
          to="/"
          className="login-brand-link"
          aria-label="ORIXA – go to landing page"
          title="ORIXA – Home"
        >
          <img src="/images/logo.png" alt="ORIXA" className="login-main-logo" />
        </Link>

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
            <Key size={17} className="input-icon" />
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
              <Smartphone size={20} />
              <span>Face ID</span>
            </button>
            <button type="button" className="biometric-btn">
              <Mic size={20} />
              <span>Voice ID</span>
            </button>
            <button type="button" className="biometric-btn">
              <Heart size={20} />
              <span>Heartbeat</span>
            </button>
          </div>
        </div>

        <div className="divider-row">
          <span>or sign in with</span>
        </div>

        <div className="social-row">
          <button type="button" className="social-btn" aria-label="Sign in with Google">
            <svg viewBox="0 0 48 48" width="20" height="20">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
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