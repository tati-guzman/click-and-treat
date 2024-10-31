//Import necessary functionalities
import React, { useState } from 'react';

const MotivationalQuotes = () => {

    //Pull real quote from API endpoints connected to ZenQuotes API - display in modal
    const pullQuote = (type) => {
        console.log("You got this! You can do it! But actually - this will be a real quote displayed to the user not the console");
        console.log(type);
    }

    //State to toggle modal display
    const [quoteModal, setQuoteModal] = useState(false);

    //Function to reset modal upon close
    const closeModal = () => {
        setQuoteModal(false);
    }

    return (
        <div>
            
            <button onClick={() => {setQuoteModal(true)}}>Feeling Stressed? Click Here for Motivation!</button>

            {quoteModal &&
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    
                    <h1>Motivational Quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer noopener">ZenQuotes</a></h1>
                    <button onClick={()=>pullQuote("of the day")}>Quote of the Day</button>

                    <button onClick={closeModal}>X</button>
                </div>
            </div>}

            {/* Add modal to display the different options and quotes pulled from API! */}
        </div>
    )
}

export default MotivationalQuotes;