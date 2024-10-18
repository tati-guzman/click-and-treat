//Import necessary functionalities
import React from 'react';

const LogIn = ({ setComponent }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debugger;

        //Check log in credentials
        //If those are correct, switch the component of user dashboard with that user's info
        console.log(event.currentTarget.username.value);


        if (event.currentTarget.username.value) {
            try {
                const response = await fetch('/api/users/:username', {
                    method: 'POST',
                    body: event.currentTarget
                });

                if (!response.ok) {
                    throw new Error("Failed to check log in");
                }

                const logInStatus = await response.json();

                if (logInStatus) {
                    //Log the user in
                    setComponent('dashboard');
                } else {
                    //Client side error handling to ask them to try again

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
                    // value={username}
                    // onChange={handleUsernameChange}
                    required
                    />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LogIn;