import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar({ onSignInClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>

      <div
        className="nav-logo"
        onClick={() => scrollToSection('home')}
        tabIndex={0}
        role="button"
        aria-label="Go to Home"
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToSection('home');
          }
        }}
      >
        Ridease
      </div>

      <ul className="nav-links">
        <li><button onClick={() => scrollToSection('home')}>Home</button></li>
        <li><button onClick={() => scrollToSection('rides')}>Rides</button></li>
        <li><button onClick={() => scrollToSection('drivers')}>For Drivers</button></li>
        <li><button onClick={() => scrollToSection('business')}>Business</button></li>
        <li><button onClick={() => scrollToSection('safety')}>Safety</button></li>
        <li><button onClick={() => scrollToSection('help')}>Help</button></li>
      </ul>

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
