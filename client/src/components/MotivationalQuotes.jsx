//Import necessary functionalities
import React, { useState } from 'react';

const MotivationalQuotes = () => {

    //Pull real quote from API endpoints connected to ZenQuotes API - display in modal
    const pullQuote = async (type) => {
        
        setQuoteError(false);

        console.log("You got this! You can do it! But actually - this will be a real quote displayed to the user not the console");
        console.log(type);
        console.log("api request", `api/quotes/${type}`)

        const response = await fetch(`api/quotes/${type}`);
        
        if (!response.ok) {
            setQuoteError(true);
        } else {
            const quoteToDisplay = await response.json();

            switch (type) {
                case "daily":
                    setQuoteOfTheDay(quoteToDisplay);
                    break
                case "random":
                    setRandomQuote(quoteToDisplay);
                    break
            }
        }
    }

    //State to toggle modal display
    const [quoteModal, setQuoteModal] = useState(false);

    //Function to reset modal upon close
    const closeModal = () => {
        setQuoteError(false);
        setQuoteModal(false);
    }
    
    //State to store the quote of the day
    const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);

    //State to store the random quote
    const [randomQuote, setRandomQuote] = useState(null);

    //State to toggle error message visibility
    const [quoteError, setQuoteError] = useState(false);

    return (
        <div>
            
            <button onClick={() => {setQuoteModal(true)}}>Feeling Stressed? Click Here for Motivation!</button>

            {quoteModal &&
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    
                    <h1>Motivational Quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer noopener">ZenQuotes</a></h1>
                    <button onClick={() => pullQuote("daily")} disabled={quoteOfTheDay}>Quote of the Day</button>
                    {quoteOfTheDay && <p>"{quoteOfTheDay.quote}"<br/>- {quoteOfTheDay.author}</p>}

                    <button onClick={() => pullQuote("random")} disabled={randomQuote}>A Little Extra Motivation</button>
                    {randomQuote && <p>"{randomQuote.quote}"<br/>- {randomQuote.author}</p>}

                    {quoteError && <p>Oops, we're having trouble pulling a quote. Please try again later.<br/> In the meantime, I hope you know that we believe in you and your pet!</p>}

                    <button onClick={closeModal}>Close</button>
                </div>
            </div>}

        </div>
    )
}

export default MotivationalQuotes;