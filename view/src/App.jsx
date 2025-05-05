import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/login" element={<Login />} /> {/* Use element instead of component */}
          <Route path="/register" element={<Register />} /> {/* Use element instead of component */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
