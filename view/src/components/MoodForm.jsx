// view/src/components/MoodForm.jsx

import React, { useState } from 'react';
import axios from '../../axios';
import '../styles/MoodForm.css';

const MoodForm = ({ onMoodSubmit }) => {
  const [emotion, setEmotion] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/moods/create', {
        emotion,
        thoughts,
        tags: tags.split(',').map(tag => tag.trim()),
      });

      if (response.status === 201) {
        alert('Mood entry created successfully!');
        setEmotion('');
        setThoughts('');
        setTags('');
        onMoodSubmit();
      }
    } catch (error) {
      console.error('Error creating mood entry:', error);
      alert('Failed to submit mood');
    }
  };

  return (
    <div className="mood-form-container dashboard-card">
      <h2>Log Your Mood</h2>
      <form className="mood-form" onSubmit={handleSubmit}>
        <label>Emotion</label>
        <input
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="e.g., Happy, Sad, Anxious"
          required
        />

        <label>Thoughts (optional)</label>
        <textarea
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          placeholder="Write anything you feel..."
          rows="4"
        />

        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., tired, calm, excited"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MoodForm;
