// view/src/components/MoodDashboard.jsx

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MoodForm from '../components/MoodForm';
import CalendarView from '../components/CalendarView';
import SuggestionBox from '../components/SuggestionBox';
import moodApi from '../services/Moodapi';
import '../styles/MoodDashboard.css';

const MoodDashboard = () => {
  const [moods, setMoods] = useState([]);

  const fetchMoods = async () => {
    try {
      const allMoods = await moodApi.getAllMoods();

      // Sort moods by timestamp in descending order (latest first)
      const sortedMoods = allMoods.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMoods(sortedMoods);
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const latestMood = moods[0]; // now the most recent mood by timestamp

  return (
    <div>
      <Navbar />
      <div className="main-dashboard">
        <MoodForm onMoodSubmit={fetchMoods} />
        <CalendarView moods={moods} />
        <SuggestionBox latestMood={latestMood} />
      </div>
    </div>
  );
};

export default MoodDashboard;
