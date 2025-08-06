import React, { useState, useEffect } from 'react';
import './BookRide.css';
import mapBg from '../assets/map.jpg'; // Your full-color map background image

export default function BookRide() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);

  // Set minimum date/time for input[type=datetime-local]
  const [minDateTime, setMinDateTime] = useState('');
  useEffect(() => {
    const now = new Date();
    setMinDateTime(now.toISOString().slice(0, 16));
  }, []);

  // Form state
  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    datetime: '',
    rideType: 'Sedan',
    notes: ''
  });

  // Handle form field changes
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    setShowSuccess(true);
    setStep(1);
    setForm({
      pickup: '',
      drop: '',
      datetime: '',
      rideType: 'Sedan',
      notes: ''
    });
    // Scroll smoothly to the success message
    window.scrollTo({ top: e.target.offsetTop, behavior: 'smooth' });
  };

  return (
    <section className="bookride-bg" id="book-ride">
      <div className="bookride-container">
        <h2 className="bookride-title">Book Your Ride</h2>
        <div className="bookride-card">
          {showSuccess ? (
            <div className="bookride-success" role="alert" aria-live="polite">
              <span role="img" aria-label="check" className="br-check">
                ✅
              </span>
              <div>
                <h3>Ride Confirmed!</h3>
                <p>Your details will be sent to your phone/email.</p>
                <button
                  className="btn-primary"
                  onClick={() => setShowSuccess(false)}
                >
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bookride-form"
              autoComplete="off"
              aria-label="Book your ride form"
            >
              {step === 1 && (
                <>
                  <label className="br-label" htmlFor="pickup">
                    <span className="br-icon">📍</span>Pick-Up Location
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    name="pickup"
                    required
                    autoFocus
                    placeholder="Enter pick-up address"
                    value={form.pickup}
                    onChange={handleChange}
                  />

                  <label className="br-label" htmlFor="drop">
                    <span className="br-icon">🏁</span>Drop Location
                  </label>
                  <input
                    id="drop"
                    type="text"
                    name="drop"
                    required
                    placeholder="Enter drop address"
                    value={form.drop}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="btn-primary br-next"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <label className="br-label" htmlFor="datetime">
                    <span className="br-icon">🕑</span>Date &amp; Time
                  </label>
                  <input
                    id="datetime"
                    name="datetime"
                    type="datetime-local"
                    required
                    min={minDateTime}
                    value={form.datetime}
                    onChange={handleChange}
                  />

                  <label className="br-label" htmlFor="rideType">
                    <span className="br-icon">🚗</span>Ride Type
                  </label>
                  <select
                    id="rideType"
                    name="rideType"
                    value={form.rideType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Sedan">Sedan (4 seats)</option>
                    <option value="Mini">Mini (4 seats)</option>
                    <option value="Bike">Bike (1 pillion)</option>
                    <option value="SUV">SUV (6 seats)</option>
                  </select>

                  <label className="br-label" htmlFor="notes">
                    <span className="br-icon">📝</span>Special Instructions
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Anything else? (optional)"
                    value={form.notes}
                    onChange={handleChange}
                  />

                  <div className="br-cta-row">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button type="submit" className="btn-primary br-submit">
                      Book Now
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Map background visible at full opacity */}
      <div className="bookride-map-mock" aria-hidden="true">
        <img src={mapBg} alt="Map Background" />
      </div>
    </section>
  );
}
