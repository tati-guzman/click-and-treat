//Import necessary functionalities
import React from 'react';
import { UserStatus } from '../context/UserContext'

const PetInfoForm = () => {

    //Import user information to use in POST/PUT request
    const { loggedUser, setLoggedUser } = UserStatus();
    
    //Handle Submit function to send the pet info to the database - either PUT for updating info or POST for new pets
        //Do not refresh page! After submission, show success modal and keep user on the same page with the form cleared
    return (
        <div>
            <h1>Pet Info Form</h1>
            <p>Insert form here to update pet name, age, species, and current prioritized skill</p>

            {/* Need submit and clear buttons */}
        </div>
    )
}

export default PetInfoForm;