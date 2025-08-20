import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validate = () => {
    if (isSignUp && form.name.trim() === '') {
      setError('Please enter your name.');
      return false;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simulate login/signup success
    setTimeout(() => {
      setLoading(false);
      onClose();
      navigate('/dashboard');
      resetForm();
    }, 500);
  };

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    resetForm();
  };

  return (
    <div className="signin-section" role="dialog" aria-modal="true" aria-labelledby="signin-title">
      <button className="signin-close" onClick={onClose} aria-label="Close">&times;</button>
      <div className="signin-container">
        <h2 className="signin-title" id="signin-title">
          {isSignUp ? 'Sign Up' : 'Sign In'} to Ridease
        </h2>
        <form className="signin-form" onSubmit={handleSubmit} autoComplete="on">
          {isSignUp && (
            <div className="input-wrapper">
              <input
                id="name"
                name="name"
                className="signin-input"
                value={form.name}
                onChange={handleChange}
                placeholder=" "
                required
                autoComplete="name"
                aria-label="Full Name"
              />
              <label htmlFor="name" className="float-label">Full Name</label>
            </div>
          )}
          <div className="input-wrapper">
            <input
              id="email"
              name="email"
              type="email"
              className="signin-input"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="email"
              aria-label="Email"
            />
            <label htmlFor="email" className="float-label">Email</label>
          </div>
          <div className="input-wrapper">
            <input
              id="password"
              name="password"
              type="password"
              className="signin-input"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
              aria-label="Password"
            />
            <label htmlFor="password" className="float-label">Password</label>
          </div>
          {error && <p className="signin-error" role="alert">{error}</p>}
          <button
            type="submit"
            className="btn-primary signin-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (isSignUp ? 'Creating...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        <p className="signin-switch">
          {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
          <button type="button" onClick={handleSwitch}>
            {isSignUp ? 'Sign In' : 'Create an Account'}
          </button>
        </p>
      </div>
    </div>
  );
}
