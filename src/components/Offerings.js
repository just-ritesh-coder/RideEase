import React from 'react';
import './Offerings.css';

// Import images from src/assets/
import carSharingImg from '../assets/car-sharing.png';
import bookRideImg from '../assets/book-ride.png';
import verifyDriverImg from '../assets/verify-driver.png';

const offerings = [
  {
    title: 'Book a Ride',
    desc: 'Request rides anytime, anywhere. Track your driver in real-time.',
    img: bookRideImg,
    alt: 'Book a Ride Illustration',
  },
  {
    title: 'Share a Ride',
    desc: 'Carpool with friends or new buddies. Reduce cost, cut emissions.',
    img: carSharingImg,
    alt: 'Share a Ride Illustration',
  },
  {
    title: 'Verified Drivers',
    desc: 'Travel with trusted, rated drivers and real user reviews every time.',
    img: verifyDriverImg,
    alt: 'Verified Drivers Illustration',
  },
];

export default function Offerings() {
  return (
    <section className="container" id="services">
      <h2>How It Works</h2>
      <div className="offer-cards">
        {offerings.map(({ title, desc, img, alt }, idx) => (
          <article className="offer-card" key={idx}>
            <img className="card-illus" src={img} alt={alt} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
