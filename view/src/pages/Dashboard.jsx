// Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import BookedAppointments from '../components/BookedAppointments';


const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <BookedAppointments/>
    </div>
  );
};

export default Dashboard; 
