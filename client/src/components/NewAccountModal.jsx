//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import { UserStatus } from '../context/UserContext';

const NewAccountModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    
    //Import user settings to use in user updates
    const { loggedUser, setLoggedUser } = UserStatus();

    //State to hold inputted information
    const [accountDetails, setAccountDetails] = useState({});

    //Create new user account with submitted form information
    const handleSubmit = async (event) => {
        event.preventDefault();
        //Error handling - do not clear form data if there is an error but display info for the user

        //IF THE POST REQUEST IS SUCCESSFUL:
        //setLoggedUser(the returned user id)
        //setComponent('dashboard')
        //onClose();
        //({ newUser: true, name: name, userId: userId, accessToken: accessToken })
        setFormErrorMessage(null);
        
       
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

                    {formErrorMessage && <p>{formErrorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default NewAccountModal;