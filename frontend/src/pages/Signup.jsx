import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const CLASSES = [
  { id: 'Warrior', name: 'Warrior', desc: 'Masters of fitness and physical strength.' },
  { id: 'Mage', name: 'Mage', desc: 'Wielders of intellect, learning, and wisdom.' },
  { id: 'Rogue', name: 'Rogue', desc: 'Agile executors of daily habits and quick tasks.' },
  { id: 'Cleric', name: 'Cleric', desc: 'Devotees of mindfulness, health, and well-being.' },
];

export default function Signup({ onNavigate }) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    characterClass: 'Warrior',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await signup(formData);
      if (onNavigate) onNavigate('dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forge Your Hero</h2>
        <p className="auth-subtitle">Begin your journey in LifeBuild</p>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Hero Name</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="e.g. Sir Arthur"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="hero@lifebuild.app"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Choose Starting Class</label>
            <div className="class-selection-grid">
              {CLASSES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  className={`class-card ${formData.characterClass === c.id ? 'selected' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, characterClass: c.id }))}
                >
                  <strong>{c.name}</strong>
                  <small>{c.desc}</small>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating Hero...' : 'Begin Adventure'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => onNavigate && onNavigate('login')}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
