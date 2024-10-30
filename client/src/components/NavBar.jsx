//Import necessary functionalities
import React from 'react';
import { Link } from 'react-router-dom';
import { UserStatus } from '../context/UserContext.jsx';

//Import log in component to hang out in the upper right hand corner of the page
import LogIn from './LogIn.jsx';

const NavBar = () => {

    //Import user information to toggle log in/log out buttons
    const { loggedUser, setLoggedUser } = UserStatus();

    //Logout function to remove logged user
    const logout = () => {
        setLoggedUser(null);
    }

    return (
        <nav>
            {/* Replace header with logo in the future */}
            
            {loggedUser
            ? <Link to="/dashboard">Click and Treat</Link>
            : <Link to="/homepage">Click and Treat</Link>}
            
            <Link to="/about">About</Link>
            <Link to="/examples">Example Training Plans</Link>

            {loggedUser 
            ? <div>
                <Link to="/account"><button>Account Information</button></Link>
                <Link to="/homepage"><button onClick={logout}>Log Out</button></Link>
            </div>
            : <LogIn />}
        </nav>
    )
}

export default NavBar;