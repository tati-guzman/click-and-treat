//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStatus } from '../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldDog, faShieldCat, faPaw } from '@fortawesome/free-solid-svg-icons';


const PetInfo = ({ setSelectedPet }) => {

    //Use useNavigate hook from React Router to establish functionality in buttons below
    const navigate = useNavigate();

    //Import user info for use in data pull
    const { loggedUser, setLoggedUser } = UserStatus();
    
    //State to hold pet information
    const [petInfo, setPetInfo] = useState(null);

    //Function to load pet information from database
    const loadPetInfo = async () => {
        const userId = loggedUser.userId;
        
        //Send query with userId as parameter to pull all pets from this user (as primary or secondary user)
        const response = await fetch(`/api/pets/${userId}`);

        //Save response in a variable to access for display
        const petData = await response.json();

        if (!petData[0].pets) {
            setPetInfo(null);
        } else {
            //Remove the first element of the array (pet status)
            petData.shift();
            //Store the rest of the data (each pet's info) in the petData state
            setPetInfo(petData);
        }
   }

    //Use Effect to download pet info when the component loads
    useEffect(() => {
        loadPetInfo();
    }, []);

    //Function to format pet information in display
    const formatPetDisplay = () => {
        return petInfo.map((pet, index) => {
            let petIcon;

            switch (pet.species) {
                case "Cat":
                    petIcon = <FontAwesomeIcon className="pet-icon" icon={faShieldCat} />;
                    break;
                case "Dog":
                    petIcon = <FontAwesomeIcon className="pet-icon" icon={faShieldDog} />;
                    break;
                default:
                    petIcon = <FontAwesomeIcon className="pet-icon" icon={faPaw} />;
                    break;
            }
            
            return (
            <div className="card pet" key={index}>
                <div className="pet-row">
                    <div className="icon-side">{petIcon}</div>
                    <div>
                        <p>Pet Name: {pet.name}</p>
                        <p>Species: {pet.species}</p>
                    </div>
                </div>
    
                <button onClick={() => selectPet(index)}>View Training Plans</button>
            </div>
            );
        })        
    }

    //Function to set selected pet state for use in UserTrainingPlans component
    const selectPet = (index) => {
        //Pull out petId and name
        const petId = petInfo[index].pet_id;
        const petName = petInfo[index].name;
        setSelectedPet({petId: petId, petName: petName});
    }

    return (
        <div className="list">
            <h1>Your Pets</h1>

            {petInfo ? formatPetDisplay() : <p>No pets associated with this account</p>}

            <button onClick={()=>{navigate("/account")}}>Add More Pets +</button>
        
        </div>
    )
}

export default PetInfo