import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Enter your Trainer Email & Passcode to continue!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate backend authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Navigate cleanly to /dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid Trainer ID or Passcode!');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setLoading(true);
    setFormData({ email: 'ash.ketchum@liferpg.io', password: 'pika', rememberMe: true });
    
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="pokemon-login-container">
      {/* Pokédex Outer Casing */}
      <div className="pokedex-card">
        
        {/* Pokédex Top Hardware Header */}
        <div className="pokedex-header">
          <div className="big-lens" />
          <div className="led-group">
            <div className="led red" />
            <div className="led yellow" />
            <div className="led green" />
          </div>
        </div>

        {/* Pokédex Screen Content */}
        <div className="pokedex-body">
          
          {/* Animated Pokeball Icon & Header */}
          <div className="pokeball-badge-wrapper">
            <div className="pokeball-badge">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" fill="#18181B" />
                <path d="M2 12H22" stroke="#EF4444" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="#FACC15" stroke="#EF4444" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="trainer-title">TRAINER LOGIN</h1>
            <p className="trainer-subtitle">Gotta gain XP! Log in to resume your quests.</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="poke-error-alert">
              <span>⚠️ {error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="poke-form">
            
            {/* Email / Trainer ID */}
            <div>
              <label className="input-label">Trainer Email / ID</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email ID"
                  className="poke-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="input-label">Passcode Key</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="poke-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Checkbox & Forgot Link */}
            <div className="remember-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Save Trainer Session</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Key?</Link>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn-primary-poke">
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Connecting to PC...</span>
                </>
              ) : (
                <>
                  <span>CHOOSE TRAINER & START</span>
                  
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">OR</span>
            <div className="divider-line" />
          </div>

          {/* Guest Trainer Pass for Judges */}
          <button type="button" onClick={handleGuestLogin} disabled={loading} className="btn-guest-poke">
            <span>QUICK GUEST TRAINER PASS</span>
          </button>

          {/* Footer Link */}
          <div className="pokedex-footer">
            New Trainer?
            <Link to="/signup" className="signup-link">Register Pokedex Profile</Link>
          </div>

        </div>
      </div>
    </div>
  );
}