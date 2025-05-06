// view/src/components/CalendarView.jsx

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarView.css';

const CalendarView = ({ moods }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyMoods, setDailyMoods] = useState([]);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(null);

  useEffect(() => {
    const selected = moods.filter((mood) => {
      const moodDate = new Date(mood.date).toDateString();
      return moodDate === selectedDate.toDateString();
    });
    setDailyMoods(selected);
    setSelectedMoodIndex(selected.length > 0 ? 0 : null);
  }, [selectedDate, moods]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasMood = moods.some(
        (mood) => new Date(mood.date).toDateString() === date.toDateString()
      );
      return hasMood ? 'highlight' : null;
    }
  };

  const selectedMood = dailyMoods[selectedMoodIndex] || null;

  return (
    <div className="calendar-container dashboard-card">
      <h2>Your Mood Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <div className="mood-details">
        <h3>Moods on {selectedDate.toDateString()}</h3>
        {dailyMoods.length > 0 ? (
          <>
            <label>Select Mood Entry:</label>
            <select
              value={selectedMoodIndex}
              onChange={(e) => setSelectedMoodIndex(Number(e.target.value))}
            >
              {dailyMoods.map((mood, index) => (
                <option key={index} value={index}>
                  {mood.emotion}
                </option>
              ))}
            </select>

            {selectedMood && (
              <div className="mood-entry">
                <strong>{selectedMood.emotion}</strong>
                {selectedMood.tags.length > 0 && (
                  <p>Tags: {selectedMood.tags.join(', ')}</p>
                )}
                {selectedMood.thoughts && <p>Thoughts: {selectedMood.thoughts}</p>}
              </div>
            )}
          </>
        ) : (
          <p>No mood recorded.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
