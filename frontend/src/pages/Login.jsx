import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login({ onNavigate }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await login(formData);
      if (onNavigate) onNavigate('dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back, Adventurer</h2>
        <p className="auth-subtitle">Log in to resume your quests</p>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              id="email"
              name="email"
              type="text"
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

          <button type="submit" className="btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Authenticating...' : 'Enter the Realm'}
          </button>
        </form>

        <p className="auth-switch">
          New hero?{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => onNavigate && onNavigate('signup')}
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}
