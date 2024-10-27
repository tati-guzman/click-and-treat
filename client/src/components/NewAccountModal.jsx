//Import necessary functionalities
import React, { useContext, useState } from 'react';
import UserComponentContext from '../UserComponentContext.js';

const NewAccountModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    
    //Import display and user settings to use in display control and user updates
    const { display, user } = useContext(UserComponentContext);
    const [component, setComponent] = display;
    const [loggedUser, setLoggedUser] = user;

    //Need to create handleSubmit function to create new user account with submitted form information

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     // debugger;

    //     //POST form data to server/database and return new user id!
    
    //     //Error handling - do not clear form data if there is an error but display info for the user

    //     //IF THE POST REQUEST IS SUCCESSFUL:
    //     //setLoggedUser(the returned user id)
    //     //setComponent('dashboard')
    //     //onClose();

    // }


    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>This Modal is working too</h1>
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

export default NewAccountModal;