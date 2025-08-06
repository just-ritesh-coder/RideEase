import React from 'react';
import './HeroSection.css';
import carSharingImg from '../assets/car-sharing.png'; // adjust path

export default function HeroSection() {
  const scrollToBook = () => {
    const el = document.getElementById('book-ride');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="section-hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Share the Road, Share the Ride</h1>
          <p>Book safe, affordable rides with verified drivers—your smartest way around the city.</p>
          <button className="btn-primary" onClick={scrollToBook}>Get Started</button>
        </div>
        <img
          className="hero-illus"
          src={carSharingImg}
          alt="Car Sharing Illustration"
        />
      </div>
    </header>
  );
}
