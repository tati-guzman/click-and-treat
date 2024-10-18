//Import necessary functionalities
import React from 'react';

const MotivationalQuotes = () => {

    //Pull real quote from API endpoints connected to ZenQuotes API - display in modal
    const pullQuote = () => {
        console.log("You got this! You can do it! But actually - this will be a real quote displayed to the user not the console");
    }

    return (
        <div>
            <h1>Motivational Quotes Component - just the button</h1>
            
            <button onClick={pullQuote}>Feeling Stressed? Click here for motivation!</button>

            {/* Add modal to display the different options and quotes pulled from API! */}
        </div>
    )
}

export default MotivationalQuotes;