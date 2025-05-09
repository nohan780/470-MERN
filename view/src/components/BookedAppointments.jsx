import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import '../styles/styles.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const userId = 'USER_ID'; // Replace this with the actual user ID, which you should get from your auth system.

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

  const openReviewModal = (therapistId) => {
    setSelectedTherapistId(therapistId);
    setRating('');
    setComment('');
    setShowReviewModal(true);
  };

  const submitReview = async () => {
    try {
      await axios.put(`/api/therapists/${selectedTherapistId}/review`, {
        rating,
        comment,
        userId, // Pass the userId as part of the request body
      });

      setShowReviewModal(false);
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return <div className="bookings-loading">Loading bookings...</div>;
  }

  return (
    <div className="bookings-table-container">
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
                  <button
                    onClick={() => openReviewModal(booking.therapist._id)}
                    className="leave-review-button"
                  >
                    Leave a Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Leave a Review</h3>
            <label>
              Rating (1-5):
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
            <br />
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <br />
            <button onClick={submitReview}>Submit Review</button>
            <button onClick={() => setShowReviewModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;
