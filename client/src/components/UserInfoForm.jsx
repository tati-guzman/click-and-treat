//Import necessary functionalities
import React from 'react';
import { UserStatus } from '../context/UserContext';

const UserInfoForm = () => {

    //Import user information to use in POST/PUT request
    const { loggedUser, setLoggedUser } = UserStatus();

    //Handle submit function to PUT the updated data in the server
        //Keep user on this page after submission and clear the form
    
    return (
        <div>
            <h1>User Info Form</h1>
            {/* Need to display their current information too */}
            <p>This is the form that will allow users to update their own information (name for MVP)</p>

            {/* Need submit and clear buttons */}
        </div>
    )
}

export default UserInfoForm;