import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from '../../axios';
import '../styles/Therapist.css';

const TherapistCard = ({ therapist, onBook, onViewReview }) => (
    <div className="therapist-card">
        <h2 className="therapist-name">{therapist.name}</h2>
        <p className="therapist-about">{therapist.about}</p>
        <p className="therapist-rating">Rating: {therapist.averageRating || "N/A"}</p>
        <button 
            onClick={() => onBook(therapist._id)} 
            className="therapist-book-button"
        >
            Book
        </button>
        <div className="therapist-reviews-section">
            <h3 className="reviews-heading">Reviews:</h3>
            {therapist.reviews && therapist.reviews.length > 0 ? (
                therapist.reviews.map((review) => (
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
);

const ReviewCard = ({ review, onViewReview }) => (
    <div className="review-card">
        <p className="review-user">
            <strong>User:</strong> {review.user.name}
        </p>
        <p className="review-rating">
            <strong>Rating:</strong> {review.rating}
        </p>
        <p className="review-comment">
            <strong>Comment:</strong> {review.comment.slice(0, 100)}...
            <button
                className="review-view-more-button"
                onClick={() => onViewReview(review)}
            >
                View Full Comment
            </button>
        </p>
    </div>
);

const ReviewModal = ({ isOpen, review, onClose }) => {
    if (!isOpen || !review) return null;
    
    return (
        <div className="review-modal">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <div className="modal-body">
                    <p className="modal-user">
                        <strong>User:</strong> {review.user.name}
                    </p>
                    <p className="modal-rating">
                        <strong>Rating:</strong> {review.rating}
                    </p>
                    <p className="modal-comment">
                        <strong>Comment:</strong> {review.comment}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Therapist = () => {
    const [therapists, setTherapists] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

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

    const handleBooking = (therapistId) => {
        console.log("Book button clicked for therapist ID:", therapistId);
    };

    const handleViewReview = (review) => {
        setSelectedReview(review);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="therapist-page">
            <Navbar />
            <div className="therapist-container">
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
            <ReviewModal
                isOpen={modalOpen}
                review={selectedReview}
                onClose={closeModal}
            />
        </div>
    );
};

export default Therapist;