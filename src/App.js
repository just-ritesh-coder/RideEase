import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BookRide from './components/BookRide';
import Review from './components/Review';
import Offerings from './components/Offerings';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Modal from 'react-modal';
import WaveSeparator from './components/WaveSeparator';

Modal.setAppElement('#root'); // Accessibility for screen readers

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <Navbar onSignInClick={() => setShowSignIn(true)} />
      <HeroSection />
      <BookRide />
      <WaveSeparator color="#e3f0fd" />
      <Review />
      <WaveSeparator color="#ffd600" height={40} />
      <Offerings />
      <WaveSeparator color="#f6faff" height={40} flip />
      <Footer />

      <Modal
        isOpen={showSignIn}
        onRequestClose={() => setShowSignIn(false)}
        contentLabel="Sign In"
        className="signin-modal"
        overlayClassName="signin-overlay"
        closeTimeoutMS={200} // smooth fade effect on close
      >
        <SignIn onClose={() => setShowSignIn(false)} />
      </Modal>
    </>
  );
}

export default App;
