import React from 'react';
import './Review.css';

const reviews = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Amazing service! Highly recommended.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Smith",
    rating: 4,
    comment: "Reliable and easy to use app.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike Johnson",
    rating: 5,
    comment: "Great drivers and quick booking.",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
      ))}
    </div>
  );
}

export default function Review() {
  return (
    <section className="review-section" id="reviews">
      <div className="container">
        <h2 className="section-title">What Our Riders Say</h2>
        <div className="review-cards">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <img src={review.img} alt={`${review.name} avatar`} className="reviewer-img" />
              <h4 className="reviewer-name">{review.name}</h4>
              <StarRating rating={review.rating} />
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
