import React, { useState } from 'react';
import './UserDashboard.css';

export default function UserDashboard() {
  // Simulated user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const [editing, setEditing] = useState(false);
  const [rides] = useState([
    { id: 1, from: 'CSMT Station', to: 'Marine Drive', date: 'Aug 10, 2025', status: 'Completed', fare: '₹180' },
    { id: 2, from: 'Bandra', to: 'Dadar', date: 'Aug 5, 2025', status: 'Completed', fare: '₹120' },
    { id: 3, from: 'Andheri West', to: 'CSMT Station', date: 'Aug 1, 2025', status: 'Cancelled', fare: '—' },
  ]);

  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        
        {/* PROFILE CARD */}
        <div className="profile-card">
          <img src={user.profilePic} alt={user.name} className="profile-pic" />

          {editing ? (
            <div className="profile-edit">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <button className="btn-primary" onClick={saveProfile}>Save</button>
              <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="profile-view">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>

        {/* RIDE HISTORY */}
        <div className="rides-card">
          <h3>Your Rides</h3>
          <table className="rides-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {rides.map(ride => (
                <tr key={ride.id} className={ride.status.toLowerCase()}>
                  <td>{ride.date}</td>
                  <td>{ride.from}</td>
                  <td>{ride.to}</td>
                  <td>{ride.status}</td>
                  <td>{ride.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
