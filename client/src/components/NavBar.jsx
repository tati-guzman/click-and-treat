//Import necessary functionalities
import React, { useContext } from 'react';
import UserComponentContext from '../UserComponentContext.js';

//Import log in component to hang out in the upper right hand corner of the page
import LogIn from './LogIn.jsx';

const NavBar = ({ }) => {

    //Import display and user settings to use in display control and user updates
    const { display, user } = useContext(UserComponentContext);
    const [component, setComponent] = display;
    const [loggedUser, setLoggedUser] = user;

    //Logout function to remove logged user and return to homepage
    const logout = () => {
        setLoggedUser(null);
        setComponent('homepage');
    }

    return (
        <nav>
            {/* Replace header with logo in the future */}
            <h1 onClick={() => loggedUser ? setComponent('dashboard') : setComponent('homepage')}>Click and Treat</h1>
            
            {/* Potentially just change into links rather than buttons */}
            <button onClick={() => setComponent('about')}>About</button>
            <button onClick={() => setComponent('examples')}>Example Training Plans</button>

            {loggedUser 
            ? <button onClick={logout}>Log Out</button>
            : <LogIn />}
        </nav>
    )
}

export default NavBar;