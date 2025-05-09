import React from 'react';
import Navbar from '../components/Navbar';
import BookingsList from '../components/BookedAppointments';
import Forum from '../components/Forum';
import Quotes from '../components/Quotes';
import '../styles/styles.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Quotes />
      <div className="section bookings-section">
        <h2>Your Bookings</h2>
        <BookingsList />
      </div>
      <div className="section forum-section">
        <Forum />
      </div>
    </div>
  );
};

export default Dashboard;