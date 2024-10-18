//Import necessary functionalities
import React, { useState, useContext } from 'react';
import ComponentContext from '../ComponentContext.js';

const SessionForm = () => {

    const { setComponent } = useContext(ComponentContext);

    //State to hold information about which stage the pet is in for the trick being trained
    const [skillStatus, setSkillStatus] = useState(null);

    //Handle submit function to POST or PUT (if draft) session details to server/database

    //Save Draft function to POST session details (with draft status) to sessions table

    //Clear function to clear all input values

    return (
        <div>
            <h1>Session Form</h1>
            <h4>Stages 1-5 listed out with details</h4>
            <p>Insert form here to gather all session details: date, notes, question about moving on to next stage</p>

            {/* Buttons to submit session, save as draft, or cancel input */}
            <button onClick={() => setComponent('history')}>View History</button>
        </div>
    )
}

export default SessionForm;