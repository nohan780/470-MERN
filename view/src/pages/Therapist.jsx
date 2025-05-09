import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from '../../axios';
import '../styles/Therapist.css';

const TherapistCard = ({ therapist, onBook, onViewReview }) => (
    <div className="therapist-card">
        <div className="therapist-card-content">
            <h2 className="therapist-name">{therapist.name}</h2>
            <p className="therapist-about">{therapist.about}</p>
            <p className="therapist-rating">Rating: {therapist.averageRating || "N/A"}</p>
            <div className="therapist-actions">
                <button 
                    onClick={() => onBook(therapist._id)} 
                    className="therapist-book-button"
                >
                    Book Now
                </button>
            </div>
            <div className="therapist-reviews-section">
                <h3 className="reviews-heading">Reviews</h3>
                {therapist.reviews && therapist.reviews.length > 0 ? (
                    therapist.reviews.slice(0, 2).map((review) => (
                        <ReviewCard 
                            key={review._id} 
                            review={review} 
                            onViewReview={onViewReview}
                        />
                    ))
                ) : (
                    <p className="no-reviews">No reviews yet.</p>
                )}
            </div>
        </div>
    </div>
);

const ReviewCard = ({ review, onViewReview }) => (
    <div className="review-card">
        <p className="review-user"><strong>{review.user.name}</strong></p>
        <p className="review-rating">Rating: {review.rating}</p>
        <p className="review-comment">
            {review.comment.slice(0, 80)}...
            <button
                className="review-view-more-button"
                onClick={() => onViewReview(review)}
            >
                Read More
            </button>
        </p>
    </div>
);

const ReviewModal = ({ isOpen, review, onClose }) => {
    if (!isOpen || !review) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <h2>Review Details</h2>
                <div className="modal-body">
                    <p><strong>User:</strong> {review.user.name}</p>
                    <p><strong>Rating:</strong> {review.rating}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                </div>
            </div>
        </div>
    );
};

const BookingModal = ({ isOpen, therapistId, onClose, onSubmit }) => {
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        paymentMethod: 'credit_card'
    });

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(therapistId, bookingData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <h2>Book Appointment</h2>
                <form onSubmit={handleSubmit} className="booking-form">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="date"
                                        name="date"
                                        value={bookingData.date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        name="time"
                                        value={bookingData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <select
                                        name="paymentMethod"
                                        value={bookingData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="credit_card">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bank_transfer">Bank Transfer</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Confirm</button>
                        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div className="bookings-loading">Loading bookings...</div>;
    }

    return (
        <div className="bookings-table-container">
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
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

const Therapist = () => {
    const [therapists, setTherapists] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedTherapistId, setSelectedTherapistId] = useState(null);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const res = await axios.get('/api/therapists');
                if (Array.isArray(res.data)) {
                    setTherapists(res.data);
                } else {
                    console.error("Expected array, got:", res.data);
                    setTherapists([]);
                }
            } catch (err) {
                console.error("Failed to fetch therapists", err);
            }
        };

        fetchTherapists();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get('/api/users/current');
            return res.data;
        } catch (err) {
            console.error("Failed to fetch current user", err);
            return null;
        }
    };

    const handleBooking = (therapistId) => {
        setSelectedTherapistId(therapistId);
        setBookingModalOpen(true);
    };

    const handleBookingSubmit = async (therapistId, bookingData) => {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
            console.error("No user logged in.");
            alert("Please log in to make a booking.");
            return;
        }

        const bookingPayload = {
            userId: currentUser.userId,
            therapistId,
            date: bookingData.date,
            time: bookingData.time,
            paymentMethod: bookingData.paymentMethod
        };

        try {
            const res = await axios.post('/api/bookings', bookingPayload);
            
            if (res.status === 201) {
                alert("Booking successful!");
            } else {
                console.error("Booking failed:", res.data);
                alert("Booking failed: " + res.data.message);
            }
        } catch (err) {
            console.error("Error while making booking request:", err);
            alert("An error occurred while making the booking.");
        }
    };

    const handleViewReview = (review) => {
        setSelectedReview(review);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedReview(null);
    };

    const closeBookingModal = () => {
        setBookingModalOpen(false);
        setSelectedTherapistId(null);
    };

    return (
        <div className="therapist-page">
            <Navbar />
            <div className="therapist-container">
                <h1>Our Therapists</h1>
                <div className="therapist-grid">
                    {therapists.length > 0 ? (
                        therapists.map((therapist) => (
                            <TherapistCard
                                key={therapist._id}
                                therapist={therapist}
                                onBook={handleBooking}
                                onViewReview={handleViewReview}
                            />
                        ))
                    ) : (
                        <p className="no-therapists">No therapists available.</p>
                    )}
                </div>
            </div>
            <BookingsList />
            <ReviewModal
                isOpen={modalOpen}
                review={selectedReview}
                onClose={closeModal}
            />
            <BookingModal
                isOpen={bookingModalOpen}
                therapistId={selectedTherapistId}
                onClose={closeBookingModal}
                onSubmit={handleBookingSubmit}
            />
        </div>
    );
};

export default Therapist;