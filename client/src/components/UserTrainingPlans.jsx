//Import necessary functionalities
import React, { useState } from 'react';
import { UserStatus } from '../context/UserContext';
import { Link } from 'react-router-dom';

const UserTrainingPlans = ({ selectedPet }) => {
    
    //Import user settings to use in data pulls
    const { loggedUser, setLoggedUser } = UserStatus();

    console.log("user trianing", selectedPet)
   
    //Will need to pull all training plan information for this particular user via server GET request
    //Hold training plan info in state
    const [trainingPlans, setTrainingPlans] = useState([]);
    
    return (
        <div>
            <h1>User Training Plans</h1>

            {/* Map through the training plan state to show different skills */}
            <p>List out all the information for the training plans the user is subscribed to, including buttons to add a session and view history (change views to those)</p>

            <Link to="/session"><button>Add Session</button></Link>
            <Link to="/history"><button>View History</button></Link>
        </div>
    )
}

export default UserTrainingPlans;