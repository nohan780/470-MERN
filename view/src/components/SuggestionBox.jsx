// view/src/components/SuggestionBox.jsx

import React, { useEffect, useState } from 'react';
import '../styles/SuggestionBox.css';

const SuggestionBox = ({ latestMood }) => {
    const [suggestion, setSuggestion] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (latestMood && latestMood.emotion) {
            setLoading(true); // Show loading while fetching suggestion

            // Suggestion mapping based on the latest mood's emotion
            const moodSuggestions = {
                happy: "Keep doing what you're doing! Consider journaling your gratitude.",
                sad: "Take a short walk, listen to calming music, or talk to someone you trust.",
                angry: "Try deep breathing or write down your thoughts to release tension.",
                anxious: "Practice mindfulness or take a break from screens.",
                neutral: "Balance your day with something fun or creative.",
                excited: "Channel your energy into something productive or artistic!",
            };

            const mood = latestMood.emotion.toLowerCase(); // Normalize to lowercase
            setSuggestion(moodSuggestions[mood] || "Keep tracking your mood. Self-awareness is power.");
            setLoading(false);
        } else {
            setLoading(false);
            setSuggestion("No mood recorded yet. Please log your mood.");
        }
    }, [latestMood]);

    const getMoodBackgroundColor = (mood) => {
        switch (mood?.toLowerCase()) {
            case 'happy':
                return '#ffeb3b'; // Yellow
            case 'sad':
                return '#2196f3'; // Blue
            case 'angry':
                return '#f44336'; // Red
            case 'anxious':
                return '#9c27b0'; // Purple
            case 'neutral':
                return '#9e9e9e'; // Gray
            case 'excited':
                return '#ff9800'; // Orange
            default:
                return '#f0f0f0'; // Default background
        }
    };

    // Format date/time nicely
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className="suggestion-box" style={{ backgroundColor: getMoodBackgroundColor(latestMood?.emotion) }}>
            <h2>Today's Suggestion</h2>
            {loading ? (
                <p>Loading suggestion...</p>
            ) : latestMood ? (
                <>
                    <p><strong>Your mood:</strong> {latestMood.emotion}</p>
                    <p><strong>Logged on:</strong> {formatDateTime(latestMood.date)}</p>
                    <p className="tip">{suggestion}</p>
                </>
            ) : (
                <p>No mood recorded yet!</p>
            )}
        </div>
    );
};

export default SuggestionBox;
