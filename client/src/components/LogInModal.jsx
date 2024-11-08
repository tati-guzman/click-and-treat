//Import necessary functionalities
import React, { useState } from 'react';
import { UserStatus } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const LogInModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    //Import display and user settings to use in display control and user updates
    const { loggedUser, setLoggedUser } = UserStatus();
    
    //Call useNavigate hook to change component display upon log in
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //Check that correct value is being submitted right now
        console.log(event.currentTarget.email.value);

        //Set the value of the username input field to be stored in username variable
        const email = event.currentTarget.email.value;

        //Create variable for the password
        const password = event.currentTarget.password.value;
        console.log(password);

        //If on submission, there is a username submitted, send it to the server to check its existence
        if (email && password) {
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password })
                });

                if (!response.ok) {
                    throw new Error("Failed to check log in");
                }

                const userStatus = await response.json();

                //If there is a user with this username, log them in
                if (userStatus.exists && userStatus.authorized) {
                    //Set the logged user state to the user id we will need to get the correct data
                    setLoggedUser({userId: userStatus.userId, name: userStatus.name});
                    
                    //Store access token locally to be used for authorization of all server calls
                    localStorage.setItem("token", userStatus.accessToken);

                    //Switch to dashboard display
                    navigate('/dashboard');
                    
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
            //Placeholder alert for temporary error handling
            alert("Please make sure to enter an email.");
        }
    }

    
    //State to hold inputted information
    const [credentials, setCredentials] = useState({});

    //Create handleChange function to update state holding inputs
    const handleChange = (event) => {
        //Pull name associated with question -> will translate to column name in database
        const name = event.target.name;

        //Pull value inputted to answer field to save for form submission
        const value = event.target.value;

        //Update credentials state to hold all inputted answers
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    }
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label><br></br>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email || ""}
                        onChange={handleChange}
                    /><br></br>

                    <label htmlFor="password">Password</label><br></br>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password || ""}
                        onChange={handleChange}
                    /><br></br>
                    

                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LogInModal;