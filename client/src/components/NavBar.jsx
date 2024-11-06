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
            ? <h1 onClick={() => navigate('/dashboard')} className="nav">Click and Treat</h1>
            : <h1 onClick={() => navigate('/homepage')} className="nav">Click and Treat</h1>}
            
            <p onClick={() => navigate('/about')}>About</p>
            <p onClick={() => navigate('/examples')}>Example Training Plans</p>

            {loggedUser 
            ? <div>
                <button onClick={() => navigate('/account')} className="nav">Account Information</button>
                <button onClick={logout} className="nav">Log Out</button>
            </div>
            : <LogIn />}
        </nav>
    )
}

export default NavBar;