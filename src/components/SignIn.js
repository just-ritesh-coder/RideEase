import React, { useState } from 'react';
import './SignIn.css';

export default function SignIn({ onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSuccess(true);
    setForm({ email: '', password: '' });
  };

  return (
    <div className="signin-section" role="dialog" aria-modal="true" aria-labelledby="signin-title">
      <button className="signin-close" onClick={onClose} aria-label="Close Sign In">&times;</button>

      <div className="signin-container">
        <h2 id="signin-title" className="signin-title">Sign In to Ridease</h2>

        {success ? (
          <div className="signin-success" role="alert" aria-live="polite">
            <p>Welcome back! You have signed in successfully.</p>
            <button className="btn-primary" onClick={() => setSuccess(false)}>
              Sign In Again
            </button>
          </div>
        ) : (
          <form className="signin-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email" className="signin-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="signin-input"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <label htmlFor="password" className="signin-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="signin-input"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              minLength={6}
            />

            {error && <p className="signin-error" role="alert">{error}</p>}

            <button type="submit" className="btn-primary signin-btn">Sign In</button>
          </form>
        )}
      </div>
    </div>
  );
}
