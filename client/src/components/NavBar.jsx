//Import necessary functionalities
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStatus } from '../context/UserContext.jsx';

//Import log in component to hang out in the upper right hand corner of the page
import LogIn from './LogIn.jsx';

const NavBar = () => {

    //Import user information to toggle log in/log out buttons
    const { loggedUser, setLoggedUser } = UserStatus();

    //Logout function to remove logged user and go back to home
    const logout = () => {
        setLoggedUser(null);
        navigate('/homepage');
    }

    //useNavigate hook to give the buttons the functionality to alter the routes
    const navigate = useNavigate();

    return (
        <nav className="nav">
            {/* Replace header with logo in the future */}
            
            {loggedUser
            ? <h1 onClick={() => navigate('/dashboard')} className="logo">🐾 Click and Treat 🐾</h1>
            : <h1 onClick={() => navigate('/homepage')} className="logo">🐾 Click and Treat 🐾</h1>}
            
            <div className="tabs">
                <p onClick={() => navigate('/about')}>About</p>
                <p onClick={() => navigate('/examples')}>Example Training Plans</p>
            </div>

            {loggedUser 
            ? <div className="nav-login">
                <button onClick={() => navigate('/account')}>Account Information</button>
                <button onClick={logout}>Log Out</button>
            </div>
            : <LogIn />}
        </nav>
    )
}

export default NavBar;