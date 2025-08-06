import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-brand">Ridease</div>
        <p className="footer-desc">Smarter rides, happier journeys. Trusted ride-sharing for everyone.</p>
        <div className="footer-links">
          <a href="#home">Home</a> | 
          <a href="#services">How It Works</a> | 
          <a href="#drivers">Drivers</a> | 
          <a href="#book-ride">Book Ride</a>
        </div>
        <p className="footer-copy">&copy; 2025 Ridease. All rights reserved.</p>
      </div>
    </footer>
  );
}
