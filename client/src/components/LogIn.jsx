//Import necessary functionalities
import React, { useContext } from 'react';
import ComponentContext from '../ComponentContext.js';

const LogIn = () => {

    const { setComponent } = useContext(ComponentContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debugger;

        //Check log in credentials
        //If those are correct, switch the component of user dashboard with that user's info
        console.log(event.currentTarget.username.value);

        const username = event.currentTarget.username.value;


        if (username) {
            try {
                const response = await fetch(`/api/users/${username}`, {
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
                    //Log the user in
                    setComponent('dashboard');
                } else {
                    //Client side error handling to ask them to try again
                    console.log("Username does not exist.");
                }
            } catch (error) {
                console.error({ message: "Error checking user name", details: error });
            }
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

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LogIn;