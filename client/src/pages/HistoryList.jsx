//Import necessary functionalities
import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const HistoryList = () => {

    //Use useNavigate hook from React Router to establish functionality in buttons below
    const navigate = useNavigate();

     //Call useLocation hook to import all the data sent from UserTrainingPlans or AddSession component
     const { state } = useLocation();
     //Save state values in their own variables
    //  const subscriptionId = state.subscriptionId;
     const title = state.title;
     const petName = state.petName;

     //'/api/sessions/history/:subscriptionId'

    //Each session will be wrapped in its own div with the following: session date, stage, user, notes, Show Details button -> this will trigger the SessionDetails component which should be a modal with the detailed information
    const [sessionsPulled, setSessionsPulled] = useState(null);
    
    return (
       <MainLayout>
            <div>
                <h1>{petName}'s Training Sessions for "{title}"</h1>

                {sessionsPulled
                ? displaySessions()
                : <p>{petName} does not have any sessions recorded for "{title}". Return to Dashboard to select a new skill/pet to view or add a new training session!</p>}

                <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
                
                {/* Note for Tati: Need to figure out how to get status to update if they return to session form without a new pull from user training plans */}
                <button onClick={() => navigate('/session', { state: { ...state }})}>Add New Session</button>

                <p>Map through the sessions state to show each individual session</p>
                <button>Session Details - no functionality right now</button>
            </div>
        </MainLayout>
    )
}

export default HistoryList;