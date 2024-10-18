//Import necessary functionalities
import React, { useContext } from 'react';
import ComponentContext from '../ComponentContext.js';
const { setComponent } = useContext(ComponentContext);

const SessionDetails = () => {

    //Convert this into a modal that pulls the information from the sessions table for the particular session

    //Display all information from the table and include buttons to go back to the history page or edit the details (if they are for a session run by that particular user)

    return (
        <div>
            <h1>Session Details Modal!</h1>
            <button onClick={() => setComponent('history')}>Back to History</button>
        </div>
    )
}

export default SessionDetails;