import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Navbar.css';

export default function Navbar({ onSignInClick }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Add this line

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // New: Go to landing page
  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={goHome}
        tabIndex={0}
        role="button"
        aria-label="Go to Home"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            goHome();
          }
        }}
      >
        Ridease
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        <li>
          <button onClick={goHome}>Home</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('rides')}>Rides</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('business')}>Business</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('safety')}>Safety</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('help')}>Help</button>
        </li>
      </ul>

      {/* ACTION BUTTONS */}
      <div className="nav-actions">
        <button className="nav-auth" onClick={onSignInClick}>
          Sign In
        </button>
        <button className="nav-cta" onClick={() => scrollToSection('book-ride')}>
          Book a Ride
        </button>
      </div>
    </nav>
  );
}
