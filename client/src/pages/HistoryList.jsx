//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const HistoryList = () => {

    //Use useNavigate hook from React Router to establish functionality in buttons below
    const navigate = useNavigate();

    //Call useLocation hook to import all the data sent from UserTrainingPlans or AddSession component
    const { state } = useLocation();
    //Save state values in their own variables
    const subscriptionId = state.subscription_id;
    const title = state.title;
    const petName = state.petName;
    
    //useEffect hook to fetch the pet's history for this plan when the component loads
    useEffect(() => {
        loadHistory();
    }, []);

    //Function to fetch pet history for this plan - NOTE: THIS USES SUBSCRIPTION ID. When the "family connection" is built (stretch goal!) it should be refactored to pull via pet_id.
    const loadHistory = async () => {
        //Send query to GET history information
        const response = await fetch(`/api/sessions/history/${subscriptionId}`);

        if (!response.ok) {
            setErrorMessage(true);
        } else {
            //Save response in a variable to access for display
            const sessionData = await response.json();

            //Pull the pet's highest status to show in display and send back to session form
            if (sessionData.status) {
                setHighestStatus(sessionData.status);
            }
            
            //If there are sessions available, pull the information to be used for display
            if (sessionData.sessions) {
                setSessionsPulled(sessionData.sessionDetails);
            }
        }
    }

    //State to dictate error message visibility
    const [errorMessage, setErrorMessage] = useState(false);

    //State to hold the highest status information from the useEffect
    const [highestStatus, setHighestStatus] = useState("Status Not Available");

    //State to hold the session information pulled from the useEffect
    // const [sessionsPulled, setSessionsPulled] = useState(null);

    //Each session will be wrapped in its own div with the following: session date, stage, user, notes, Show Details button -> this will trigger the SessionDetails component which should be a modal with the detailed information

    //Function to map through the session information and format display of the sessions
    // const displaySessions = () => {

    // }
    
    return (
       <MainLayout>
            <div>
                <h1>{petName}'s Training Sessions for "{title}"</h1>

                {errorMessage 
                ? <h3>Oops, we're having trouble pulling data for {petName}. Please try again.</h3>
                : <h3>Highest Status Reached: {highestStatus}</h3>}

                {/* {sessionsPulled
                ? displaySessions()
                : <p>{petName} does not have any sessions recorded for "{title}". Return to Dashboard to select a new skill/pet to view or add a new training session!</p>} */}

                <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
                
                {/* Note for Tati - Future Goal: Need to brainstorm how to send updated status from this query if they return to session form without a new pull from user training plans */}
                <button onClick={() => navigate('/session', { state: { ...state }})}>Add New Session</button>

                <p>Map through the sessions state to show each individual session</p>
                <button>Session Details - no functionality right now</button>
            </div>
        </MainLayout>
    )
}

export default HistoryList;