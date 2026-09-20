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
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 1.34 5.06 5.06 0 0 1-3.47 0 5.06 5.06 0 0 1-2.2-1.34c-.73-.55-1.4-1.17-1.98-1.88l-.86 1.36c.6.57 1.38.97 2.23 1.26.84.3 1.74.45 2.67.45.95 0 1.85-.15 2.7-.45 1.08-.4 1.98-.9 2.66-1.51.26-.3.47-.65.63-1.03.16-.38.24-.78.24-1.2 0-.42-.08-.8-.25-1.14-.22-.46-.55-.85-.98-1.17-.43-.32-.9-.55-1.41-.7-.51-.15-1.04-.23-1.58-.23H2.94v3.06h2.16a5.06 5.06 0 0 1-2.2 1.34 5.06 5.06 0 0 1-3.47 0 5.06 5.06 0 0 1-2.2-1.34c-.73-.55-1.4-1.17-1.98-1.88l-.86 1.36c.6.57 1.38.97 2.23 1.26.84.3 1.74.45 2.67.45.95 0 1.85-.15 2.7-.45 1.08-.4 1.98-.9 2.66-1.51.26-.3.47-.65.63-1.03.16-.38.24-.78.24-1.2 0-.42-.08-.8-.25-1.14-.22-.46-.55-.85-.98-1.17-.43-.32-.9-.55-1.41-.7-.51-.15-1.04-.23-1.58-.23H1.5C.67 8.69 0 9.46 0 10.27c0 .81.67 1.58 1.5 1.58h22.56z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.34-2.56l-5.92-3.5A7.07 7.07 0 0 0 12 17.07V23z" fill="#34A853"/>
              <path d="M5.62 12.59c0-1.03.13-2.05.38-3.02l4.5 2.73A7.07 7.07 0 0 0 12 17.07V14.08l-4.38-2.54A7.08 7.08 0 0 0 5.62 12.59z" fill="#FBBC05"/>
              <path d="M12 5.34c1.62.86 2.75 1.99 3.47 3.29l-3.16 1.85A7.07 7.07 0 0 0 12 7.07V5.34z" fill="#EA4335"/>
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