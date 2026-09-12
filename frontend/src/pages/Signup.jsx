import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import './Login.css'; // Reuses glowing LED & card animations from Login

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    specialty: 'electric',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required Trainer details!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passcodes do not match!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          specialty: formData.specialty,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create Trainer profile');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Navigate to login after registration
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to create Trainer profile. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokemon-signup-container">
      {/* Pokédex Outer Card */}
      <div className="pokedex-signup-card">
        
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
          
          {/* Pokeball Badge & Title */}
          <div className="pokeball-badge-wrapper">
            <div className="pokeball-badge">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" fill="#18181B" />
                <path d="M2 12H22" stroke="#EF4444" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="#FACC15" stroke="#EF4444" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="trainer-title">REGISTER TRAINER</h1>
            <p className="trainer-subtitle">Create your Pokédex Profile to start gaining XP!</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="poke-error-alert">
              <span>⚠️ {error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="poke-form">
            
            {/* Trainer Name */}
            <div>
              <label className="input-label">Trainer Name</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. Ash Ketchum"
                  className="poke-input"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="input-label">Trainer Email</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hero@pallettown.com"
                  className="poke-input"
                />
              </div>
            </div>

            {/* Starter Specialty Class */}
            <div>
              <label className="input-label">Starter Specialty</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">⚡</span>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="poke-select"
                >
                  <option value="electric">⚡ Electric Specialist (Intellect & Coding)</option>
                  <option value="fighting">🥊 Fighting Specialist (Strength & Gym)</option>
                  <option value="grass">🌿 Nature Specialist (Wellness & Habits)</option>
                  <option value="psychic">🔮 Psychic Specialist (Focus & Study)</option>
                </select>
              </div>
            </div>

            {/* Passcode */}
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

            {/* Confirm Passcode */}
            <div>
              <label className="input-label">Confirm Passcode</label>
              <div className="poke-input-wrapper">
                <span className="poke-input-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="poke-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn-primary-poke">
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Registering Trainer...</span>
                </>
              ) : (
                <>
                  <span>CREATE PROFILE & START</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Link to Login */}
          <div className="pokedex-footer">
            Already have a Pokédex Profile?
            <Link to="/login" className="login-link">Login Here</Link>
          </div>

        </div>
      </div>
    </div>
  );
}