//Import necessary functionalities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Import log in component to hang out in the upper right hand corner of the page
import LogIn from './LogIn.jsx';

const NavBar = () => {

    //Temporary state to hold logged user - update with useContext and OAuth info
    const [loggedUser, setLoggedUser] = useState(null);

    //Logout function to remove logged user
    const logout = () => {
        setLoggedUser(null);
    }

    return (
        <nav>
            {/* Replace header with logo in the future */}
            {/* <h1 onClick={() => loggedUser ? setComponent('dashboard') : setComponent('homepage')}>Click and Treat</h1> */}
            {/* Need to create function to link to homepage or dashboard based on loggedUser */}
            <Link to="/homepage">Click and Treat</Link>
            
            <Link to="/about">About</Link>
            <Link to="/examples">Example Training Plans</Link>

            {loggedUser 
            ? <Link to="/homepage"><button onClick={logout}>Log Out</button></Link>
            : <LogIn loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}
        </nav>
    )
}

export default NavBar;