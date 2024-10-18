//Import necessary functionalities
import React from 'react';

const HistoryList = () => {

    //Use the sessions state to map through each of the sessions for display

    //Each session will be wrapped in its own div with the following: session date, stage, user, notes, Show Details button -> this will trigger the SessionDetails component which should be a modal with the detailed information
    
    return (
        <div>
            <h1>History List</h1>
            <p>Map through the sessions state to show each individual session</p>
            <button>Session Details - no functionality right now</button>
        </div>
    )
}

export default HistoryList;