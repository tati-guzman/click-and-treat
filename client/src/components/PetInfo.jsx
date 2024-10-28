//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserStatus } from '../context/UserContext';

const PetInfo = () => {

    //Import user info for use in data pull
    const { loggedUser, setLoggedUser } = UserStatus();
    console.log("from pet info", loggedUser);

   //State to hold pet information
   const [petInfo, setPetInfo] = useState([]);

   //Function to load pet information from database
   const loadPetInfo = async () => {
    debugger;
    console.log("Logged User");
    console.log(loggedUser);

    // const userNumber = user[0]
    const response = await fetch(`/api/pets/1`);

    const petData = await response.json();

    if (!petData) {
        console.log("error retrieving pet data");
    } else {
        setPetInfo(petData);
        console.log(petInfo);
    }

   }

    //Use Effect to download pet info when the component loads
    // useEffect(() => {
    //     loadPetInfo();
    // }, []);

    return (
        <div>
            <h1>Pet Info Component</h1>

            <Link to="/account"><button>Add More Pets (send to account info component)</button></Link>
        </div>
    )
}

export default PetInfo