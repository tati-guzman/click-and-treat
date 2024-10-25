//Import necessary functionalities
import React, { useContext, useState } from 'react';
import UserComponentContext from '../UserComponentContext.js';

const LogInModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    //Import display and user settings to use in display control and user updates
    const { display, user } = useContext(UserComponentContext);
    const [component, setComponent] = display;
    const [loggedUser, setLoggedUser] = user;
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //Check that correct value is being submitted right now
        console.log(event.currentTarget.username.value);

        //Set the value of the username input field to be stored in username variable
        const username = event.currentTarget.username.value;

        //Future Plans: Add in password functionality - OAuth?

        //If on submission, there is a username submitted, send it to the server to check its existence
        if (username) {
            try {
                const response = await fetch('/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username })
                });

                if (!response.ok) {
                    throw new Error("Failed to check log in");
                }

                const userStatus = await response.json();

                //If there is a user with this username, log them in
                if (userStatus.exists) {
                    //Change view of component to user dashboard
                    setComponent('dashboard');
                    //Set the logged user state to the user id we will need to get the correct data
                    setLoggedUser(userStatus.userID);
                    //Close the modal
                    onClose();
                } else {
                    //Client side error handling to ask them to try again - need to update once log in is fleshed out
                    console.log("Username does not exist.");
                }
            } catch (error) {
                //Update this error handling as well once log in is complete
                console.error({ message: "Error checking user name", details: error });
            }
        } else {
            //Placeholder alert for temporary error handling - will implement robust form error handling while building out full log in component in Week 3
            alert("Please make sure to enter a username.");
        }
    }


    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Pick User</label><br></br>
                    <select name="username">
                        <option key="1" value="user1">Test User 1</option>
                        <option key="2" value="user2">Test User 2</option>        
                    </select>

                    <button type="submit">Log In</button>
                </form>
            
            {/* Original Form with username submission - may use to complete OAuth? */}
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    />

                

                <button type="submit">Submit</button>
                </form> */}
            </div>
        </div>
    )
}

export default LogInModal;