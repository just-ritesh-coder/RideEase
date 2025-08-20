import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BookRide from './components/BookRide';
import LiveTrackingExample from './components/LiveTrackingExample'; // Leaflet version
import Review from './components/Review';
import Offerings from './components/Offerings';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import UserDashboard from './components/UserDashboard';
import WaveSeparator from './components/WaveSeparator';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [rideBooked, setRideBooked] = useState(false);
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  // Receive coordinates from BookRide after geocoding
  function handleRideBooking({ pickup, drop }) {
    setPickup(pickup);
    setDrop(drop);
    setRideBooked(true);
  }

  return (
    <Router>
      <Navbar onSignInClick={() => setShowSignIn(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />

              {/* BookRide remains unchanged */}
              <BookRide onRideBooked={handleRideBooking} />

              {/* Show Leaflet Live Tracking after booking */}
              {rideBooked && pickup && drop && (
                <div style={{ maxWidth: '900px', margin: '2.5rem auto' }}>
                  <LiveTrackingExample pickup={pickup} drop={drop} />
                </div>
              )}

              <WaveSeparator color="#e3f0fd" />
              <Review />
              <WaveSeparator color="#ffd600" height={40} />
              <Offerings />
              <WaveSeparator color="#f6faff" height={40} flip />
              <Footer />
            </>
          }
        />

        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>

      <Modal
        isOpen={showSignIn}
        onRequestClose={() => setShowSignIn(false)}
        contentLabel="Sign In or Sign Up"
        className="signin-modal"
        overlayClassName="signin-overlay"
        closeTimeoutMS={200}
      >
        <SignIn onClose={() => setShowSignIn(false)} />
      </Modal>
    </Router>
  );
}
