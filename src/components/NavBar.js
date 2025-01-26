import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
      
        try {
          await signOut(auth); // Sign out from Firebase auth
          sessionStorage.removeItem("jwt_token"); // Remove token from sessionStorage
          alert("Logged out successfully."); // Alert user of successful logout
          navigate('/login'); // Redirect to login page
        } catch (error) {
          console.error("Logout Error:", error);
          alert("Logout failed. Please try again."); // Alert user of error
        } 
      };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Task Manager</Link>
                {user && ( // Conditionally render links if user is logged in
                    <>
                        <Link to="/home" style={{ marginRight: '10px', textDecoration: 'none', color: 'black' }}>Home</Link>
                        <Link to="/feed" style={{ marginRight: '10px', textDecoration: 'none', color: 'black' }}>Feed</Link>
                    </>
                )}
            </div>
            <div>
               
                    <button onClick={handleLogout} style={{ padding: '5px 10px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }}>Logout</button>
                
            </div>
        </nav>
    );
};

export default Navbar;
