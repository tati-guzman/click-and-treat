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

    //State to hold various error messages
    const [formErrorMessage, setFormErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrorMessage(null);

        //If on submission, both credentials are submitted, send them to the server to check authorization
        if (credentials.email && credentials.password && credentials.password.replace(/\s/g, '').length !== 0) {
            try {
                //Need to add encryption to password so it's sent securely
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
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
                    localStorage.setItem("CaT_Token", userStatus.accessToken);

                    //Switch to dashboard display
                    navigate('/dashboard');
                    
                    //Close the modal
                    onClose();
                } else {
                    setFormErrorMessage("Invalid username or password.");
                }
            } catch (error) {
                setFormErrorMessage("Please try again.");
                console.error({ message: "Error checking credentials", details: error });
            }
        } else {
            setFormErrorMessage("Please enter a username and password.");
        }
    }

    //State to hold inputted information
    const [credentials, setCredentials] = useState({});

    //Update state holding inputs as the user types
    const handleChange = (event) => {
        //Pull name associated with question -> will translate to column name in database
        const name = event.target.name;

        //Pull value inputted to answer field to save for form submission
        const value = event.target.value;

        //Update credentials state to hold all inputted answers
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    }

    //Function to clear inputs and exit modal
    const cancel = () => {
        setCredentials({});
        onClose();
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
                    /><br></br><br></br>

                    <label htmlFor="password">Password</label><br></br>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password || ""}
                        onChange={handleChange}
                    /><br></br><br></br>
                    
                    <button type="submit">Log In</button>
                    <button onClick={cancel}>Cancel</button>

                    {formErrorMessage ? <p>{formErrorMessage}</p> : null}
                </form>
            </div>
        </div>
    )
}

export default LogInModal;