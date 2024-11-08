//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import { UserStatus } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const NewAccountModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    
    //Call useNavigate hook to change component display upon log in
    const navigate = useNavigate();

    //Import user settings to use in user updates
    const { loggedUser, setLoggedUser } = UserStatus();

    //State to hold inputted information
    const [accountDetails, setAccountDetails] = useState({});

    //Create new user account with submitted form information
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        //Clear messages from previous submit attempts
        setFormErrorMessage(null);
        
        //If on submission, there is a username submitted, send it to the server to check its existence
        if (Object.keys(accountDetails).length === 3 && passwordMatch) {
            try {
                const response = await fetch('/api/users/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(accountDetails)
                });

                if (!response.ok) {
                    throw new Error("Failed to create account");
                }

                const newAccount = await response.json();

                //If there is a user with this username, account was not created. Set error message.
                if (!newAccount.newUser) {
                    setFormErrorMessage("An account for this email already exists.");
                } else {
                    //Set the logged user state to the user id we will need to get the correct data
                    setLoggedUser({userId: newAccount.userId, name: newAccount.name});
                    
                    //Store access token locally to be used for authorization of all server calls
                    localStorage.setItem("token", newAccount.accessToken);

                    //Switch to dashboard display
                    navigate('/dashboard');
                    
                    //Close the modal
                    onClose();   
                }
            } catch (error) {
                setFormErrorMessage("Please try again.");
                console.error({ message: "Error creating account", details: error });
            }
        } else {
            setFormErrorMessage("All fields are required.");
        }
    }

    //States to hold message visibility
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState("");

    //Function to check for passwords matching when either one is changed
    useEffect(() => {
        setPasswordMatch(confirmedPassword === accountDetails.password)
    }, [confirmedPassword, accountDetails.password]);

    //Update state holding submitted details as the user types
    const handleChange = (event) => {
        //Pull name associated with question -> will translate to column name in database
        const name = event.target.name;

        //Pull value inputted to answer field to save for form submission
        const value = event.target.value;

        if (name === "confirmedPassword") {
            setConfirmedPassword(value);
        } else {
            //Update account details state to hold all inputted answers
            setAccountDetails(prevAccountDetails => ({ ...prevAccountDetails, [name]: value }));
        }        
    }

    //Function to clear inputs and exit modal
    const cancel = () => {
        setAccountDetails({});
        onClose();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Preferred First Name</label><br></br>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        value={accountDetails.name || ""}
                        onChange={handleChange}
                    /><br></br><br></br>

                    <label htmlFor="email">Email</label><br></br>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={accountDetails.email || ""}
                        onChange={handleChange}
                    /><br></br><br></br>

                    <label htmlFor="password">Password</label><br></br>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={accountDetails.password || ""}
                        onChange={handleChange}
                    /><br></br><br></br>

                    <label htmlFor="confirmedPassword">Confirm Password</label><br></br>
                    <input
                        type="password"
                        id="confirmedPassword"
                        name="confirmedPassword"
                        value={confirmedPassword}
                        onChange={handleChange}
                    /><br></br>
                    {!passwordMatch && confirmedPassword && <p>Passwords do not match</p>}
                    
                    <button type="submit">Create Account</button>
                    <button onClick={cancel}>Cancel</button>

                    {formErrorMessage && <p>{formErrorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default NewAccountModal;