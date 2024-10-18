//Import necessary functionalities
import React from 'react';
import LogIn from './LogIn.jsx';

const HomePage = ({ setComponent }) => {

    return (
        <div>
            <h1>Home Page</h1>

            <h1>Header</h1>
            <p>Blurb about the site and dog training</p>

            <LogIn setComponent={setComponent}/>

        </div>
    )
}

export default HomePage;