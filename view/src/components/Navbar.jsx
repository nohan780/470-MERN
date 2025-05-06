import axios from "../../axios"; 
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
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

    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="title">Whack Shack</h1>
            </div>
            <div className="navbar-right">
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
