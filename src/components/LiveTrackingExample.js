import React from 'react';
import MapTrackingLeaflet from './MapTrackingLeaflet';

export default function LiveTrackingExample({ pickup, drop }) {
  console.log('LiveTracking received pickup and drop coords:', { pickup, drop });

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      background: '#fff',
      padding: '2em',
      borderRadius: '1em',
      boxShadow: '0 3px 20px rgba(9,87,177,0.08)'
    }}>
      <h2 style={{ color: '#0957b1', marginBottom: '1.1em' }}>Live Ride Tracking</h2>
      <MapTrackingLeaflet pickup={pickup} drop={drop} />
      <div style={{ marginTop: '1.5em', fontWeight: '500', color: '#29437d' }}>
        <p>Estimated travel time: 25 mins</p>
        <p>Estimated fare: ₹200</p>
      </div>
    </div>
  );
}
