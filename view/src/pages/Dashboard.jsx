// // Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import MoodForm from '../components/MoodForm';
// import CalendarView from '../components/CalendarView';
// import SuggestionBox from '../components/SuggestionBox';

// const Dashboard = () => {
//   const [moodData, setMoodData] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const fetchMoods = async () => {
//     try {
//       const res = await fetch('/api/moods');
//       const data = await res.json();
//       setMoodData(data);
//     } catch (err) {
//       console.error("Failed to fetch moods", err);
//     }
//   };

//   useEffect(() => {
//     fetchMoods();
//   }, [refreshTrigger]);

//   const handleMoodSubmitted = () => {
//     setRefreshTrigger(prev => prev + 1); // trigger re-fetch
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="main-dashboard">
//         <MoodForm onMoodSubmitted={handleMoodSubmitted} />
//         <CalendarView moods={moodData} />
//         <SuggestionBox latestMood={moodData[0]} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      {/* Everything else is hidden for now */}
    </div>
  );
};

export default Dashboard;
