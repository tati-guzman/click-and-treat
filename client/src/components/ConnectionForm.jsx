//Import necessary functionalities
import React from 'react';
import { UserStatus } from '../context/UserContext';

const ConnectionForm = () => {

    const { loggedUser, setLoggedUser } = UserStatus();
    //Handle submit function to POST the information the family table via server
        //Don't take user off this page when they submit. Just clear the form!
        //Need to also validate that the other user even exists before placing connection
            //Super stretch goal: Ask the other user for confirmation to be added?
    
    return (
        <div>
            <h1>Connection Form</h1>
            <p>This is a stretch goal! This form will connect one user to another user so they can monitor the same pet</p>

            {/* Add submit and clear buttons  */}
        </div>
    )
}

export default ConnectionForm;