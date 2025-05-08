import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import MoodDashboard from './pages/MoodDashboard';
import Dashboard from './pages/Dashboard';
import CalendarView from './components/CalendarView';
import SuggestionBox from './components/SuggestionBox';
import Therapist from './pages/Therapist';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path = "/therapist"
            element={
              <ProtectedRoute>
                <Therapist />
              </ProtectedRoute>
            }
            />
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <MoodDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <SuggestionBox />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
