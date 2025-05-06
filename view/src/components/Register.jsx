import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'; // use your configured instance

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      const response = await axios.post('/api/users/register', {
        username,
        email,
        password
      });

      if (response.status === 201) {
        // On success, clear any previous errors and navigate
        setError(''); 
        navigate('/login'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default Register;
