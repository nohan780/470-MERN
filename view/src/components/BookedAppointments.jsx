import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import '../styles/BookingsList.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings when the component is mounted
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  // Handle payment status update
  const handlePaymentStatusChange = async (appointmentId) => {
    try {
      const updatedBooking = await axios.patch(`/api/bookings/bookings/${appointmentId}`, {
        paymentStatus: 'paid',
      });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === appointmentId ? updatedBooking.data : booking
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  // Render loading state or table of bookings
  if (loading) {
    return <div className="bookings-loading">Loading bookings...</div>;
  }

  return (
    <div className="bookings-table-container">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Therapist</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.therapist.name}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.paymentStatus}</td>
                <td>
                  <button
                    onClick={() => handlePaymentStatusChange(booking._id)}
                    disabled={booking.paymentStatus === 'paid'}
                    className="mark-paid-button"
                  >
                    Mark as Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsList;