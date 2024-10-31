//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';
import { useLocation } from 'react-router-dom';

const HistoryList = () => {

     //Call useLocation hook to import all the data sent from UserTrainingPlans component
     //state holds the following info from UserTrainingPlans: subscription_id, user_id, pet_id, plan_id, status, last_updated, title, petName, stages
     const { state } = useLocation();

     //'/api/sessions/history/:subscriptionId'

    //Use the sessions state to map through each of the sessions for display

    //Each session will be wrapped in its own div with the following: session date, stage, user, notes, Show Details button -> this will trigger the SessionDetails component which should be a modal with the detailed information
    
    return (
       <MainLayout>
            <div>
                <h1>History List</h1>
                <p>Map through the sessions state to show each individual session</p>
                <button>Session Details - no functionality right now</button>
            </div>
        </MainLayout>
    )
}

export default HistoryList;