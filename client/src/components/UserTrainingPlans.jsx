//Import necessary functionalities
import React, { useContext, useState } from 'react';
import ComponentContext from '../ComponentContext.js';

const UserTrainingPlans = () => {
    
    const { setComponent } = useContext(ComponentContext);

    //Will need to pull all training plan information for this particular user via server GET request
    //Hold training plan info in state
    const [trainingPlans, setTrainingPlans] = useState([]);
    
    return (
        <div>
            <h1>User Training Plans</h1>

            {/* Map through the training plan state to show different skills */}
            <p>List out all the information for the training plans the user is subscribed to, including buttons to add a session and view history (change views to those)</p>

            <button onClick={() => setComponent('session form')}>Add Session</button>
            <button onClick={() => setComponent('history')}>View History</button>
        </div>
    )
}

export default UserTrainingPlans;