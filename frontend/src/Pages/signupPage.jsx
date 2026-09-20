import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signupPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary fake signup (no backend yet) — mirrors the login page flow
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);

    navigate("/home");
  };

  return (
    <div className="signup-page">
      {/* Full-bleed background */}
      <img src="/images/city-dusk.png" alt="" className="signup-bg-image" />
      <div className="signup-bg-overlay" />

      <div className="signup-card">
        {/* Brand logo — links back to the landing page */}
        <Link
          to="/"
          className="signup-brand-link"
          aria-label="ORIXA – go to landing page"
          title="ORIXA – Home"
        >
          <img src="/images/logo.png" alt="ORIXA Logo" className="signup-main-logo" />
        </Link>
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />

          <button type="submit" className="signup-submit-btn">Create Account</button>
        </form>

        <p className="signup-login-row">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;