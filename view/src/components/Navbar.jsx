import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import '../styles/Navbar.css';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {

            const response = await axios.post('/api/users/logout');
            
            if (response.status === 200) {
                console.log('Logged out successfully');
 
                window.location.reload(); 
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleTP = async() =>{
        navigate('/therapist');
    }
    const handleDB = async() =>{
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="title" onClick={handleDB}>Whack Shack</h1>
            </div>
            <div className="navbar-right">
                <button onClick={() => navigate('/')} className="nav-btn">Home</button>
                <button onClick={() => navigate('/mood')} className="nav-btn">Mood</button>
                <button onClick={() => navigate('/profile')} className="nav-btn">Suggestions</button>
                <button className="therapist-btn" onClick={handleTP}>
                    Therapists
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;
