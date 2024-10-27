//Import necessary functionalities
import React, { useState } from 'react';

//Import components to log in or create account
import LogInModal from './LogInModal.jsx';
import NewAccountModal from './NewAccountModal.jsx';

const LogIn = () => {
    
    //State to hold display status of both modals
    const [logInModal, setLogInModal] = useState(false);
    const [newAccountModal, setNewAccountModal] = useState(false);

    return (
        <div>
            
            <button onClick={()=> setLogInModal(true)}>Log In</button>
            <button onClick={()=> setNewAccountModal(true)}>Create an Account</button>

            {logInModal && <LogInModal isOpen={logInModal} onClose={() => setLogInModal(false)}/>}
            {newAccountModal && <NewAccountModal isOpen={newAccountModal} onClose={() => setNewAccountModal(false)}/>}
            
        </div>
    )
}

export default LogIn;