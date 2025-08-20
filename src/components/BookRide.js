import React, { useState, useEffect } from 'react';
import './BookRide.css';
import mapBg from '../assets/map.jpg';
import AutocompleteInput from './AutocompleteInput';

export default function BookRide({ onRideBooked }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const [minDateTime, setMinDateTime] = useState('');
  useEffect(() => {
    const now = new Date();
    setMinDateTime(now.toISOString().slice(0, 16));
  }, []);

  const [form, setForm] = useState({
    pickupText: '',
    dropText: '',
    pickupCoords: null,
    dropCoords: null,
    datetime: '',
    rideType: 'Sedan',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.pickupCoords || !form.dropCoords) {
      setError('Please select pickup and drop locations from the suggestions.');
      return;
    }
    if (!form.datetime) {
      setError('Please select date and time.');
      return;
    }

    setLoading(true);

    try {
      console.log('Booking coordinates:', {
        pickup: form.pickupCoords,
        drop: form.dropCoords
      });

      setShowSuccess(true);
      setStep(1);
      setLoading(false);

      if (onRideBooked) {
        onRideBooked({
          pickup: form.pickupCoords,
          drop: form.dropCoords
        });
      }

      setForm({
        pickupText: '',
        dropText: '',
        pickupCoords: null,
        dropCoords: null,
        datetime: '',
        rideType: 'Sedan',
        notes: ''
      });
    } catch {
      setError('Failed to book ride. Try again.');
      setLoading(false);
    }

    window.scrollTo({ top: e.target.offsetTop, behavior: 'smooth' });
  };

  return (
    <section className="bookride-bg" id="book-ride">
      <div className="bookride-container">
        <h2 className="bookride-title">Book Your Ride</h2>
        <div className="bookride-card">
          {showSuccess ? (
            <div className="bookride-success" role="alert" aria-live="polite">
              <span role="img" aria-label="check" className="br-check">✅</span>
              <div>
                <h3>Ride Confirmed!</h3>
                <p>Your details will be sent to your phone/email.</p>
                <button className="btn-primary" onClick={() => setShowSuccess(false)}>Book Another</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bookride-form" autoComplete="off" aria-label="Book your ride form">
              {error && <div className="error-message">{error}</div>}
              {step === 1 && (
                <>
                  <label className="br-label" htmlFor="pickup">
                    <span className="br-icon">📍</span>Pick-Up Location
                  </label>
                  <AutocompleteInput
                    placeholder="Enter pick-up address"
                    value={form.pickupText}
                    onChange={val => setForm(f => ({ ...f, pickupText: val }))}
                    onSelect={coords => setForm(f => ({ ...f, pickupCoords: coords }))}
                    id="pickup"
                  />

                  <label className="br-label" htmlFor="drop">
                    <span className="br-icon">🏁</span>Drop Location
                  </label>
                  <AutocompleteInput
                    placeholder="Enter drop address"
                    value={form.dropText}
                    onChange={val => setForm(f => ({ ...f, dropText: val }))}
                    onSelect={coords => setForm(f => ({ ...f, dropCoords: coords }))}
                    id="drop"
                  />

                  <button type="button" className="btn-primary br-next" onClick={() => setStep(2)} disabled={loading}>Next</button>
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
                    onChange={e => setForm(f => ({ ...f, datetime: e.target.value }))}
                    disabled={loading}
                  />

                  <label className="br-label" htmlFor="rideType">
                    <span className="br-icon">🚗</span>Ride Type
                  </label>
                  <select
                    id="rideType"
                    name="rideType"
                    value={form.rideType}
                    onChange={e => setForm(f => ({ ...f, rideType: e.target.value }))}
                    required
                    disabled={loading}
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
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    disabled={loading}
                  />

                  <div className="br-cta-row">
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)} disabled={loading}>Back</button>
                    <button type="submit" className="btn-primary br-submit" disabled={loading}>{loading ? 'Booking…' : 'Book Now'}</button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="bookride-map-mock" aria-hidden="true">
        <img src={mapBg} alt="Map Background" />
      </div>
    </section>
  );
}
