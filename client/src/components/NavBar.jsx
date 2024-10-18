//Import necessary functionalities
import React, { useContext } from 'react';
import ComponentContext from '../ComponentContext.js';

const NavBar = ({ }) => {

    const { setComponent } = useContext(ComponentContext);

    return (
        <nav>
            {/* Replace header with logo in the future */}
            <h1 onClick={() => setComponent('homepage')}>Click and Treat</h1>
            
            {/* Potentially just change into links rather than buttons */}
            <button onClick={() => setComponent('about')}>About</button>
            <button onClick={() => setComponent('examples')}>Example Training Plans</button>

        </nav>
    )
}

export default NavBar;