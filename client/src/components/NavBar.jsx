//Import necessary functionalities
import React from 'react';

const NavBar = ({ setComponent }) => {

    return (
        <nav>
            
            <h1 onClick={() => setComponent('homepage')}>Click and Treat</h1>
            
            <button onClick={() => setComponent('about')}>About</button>
            <button onClick={() => setComponent('form')}>Create a Post</button>

        </nav>
    )
}

export default NavBar;