//Import necessary functionalities
import React, { useContext } from 'react';
import ComponentContext from '../ComponentContext.js';

const LogIn = () => {
    //Import the setComponent function to use in display control
    const { setComponent } = useContext(ComponentContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debugger;

        //Check log in credentials
        //If those are correct, switch the component of user dashboard with that user's info
        console.log(event.currentTarget.username.value);

        //Set the value of the username input field to be stored in username variable
        const username = event.currentTarget.username.value;

        //Future Plans: Add in password functionality

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

                if (userStatus.exists) {
                    //Log the user in and change the view to show user dashboard
                    setComponent('dashboard');
                } else {
                    //Client side error handling to ask them to try again - need to update
                    console.log("Username does not exist.");
                }
            } catch (error) {
                console.error({ message: "Error checking user name", details: error });
            }
        } else {
            //Placeholder alert for temporary error handling - will implement robust form error handling while building out full log in component in Week 2
            alert("Please make sure to enter a username.");
        }

    }

    return (
        <div>
            <h1>Log In Component:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    />

                {/* Still need to add password portion */}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LogIn;