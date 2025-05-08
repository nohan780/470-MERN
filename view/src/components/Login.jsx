import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'; 
import "../styles/Login.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
  
    try {
      const response = await axios.post('/api/users/login', { email, password });
      if (response.status === 200) {
        navigate('/');  
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
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
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
