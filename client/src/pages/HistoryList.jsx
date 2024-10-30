//Import necessary functionalities
import React from 'react';
import { UserStatus } from '../context/UserContext';
import MainLayout from '../layout/MainLayout';

const HistoryList = () => {

    //Import user settings to use in user specific info pulls
    const { loggedUser, setLoggedUser } = UserStatus();

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