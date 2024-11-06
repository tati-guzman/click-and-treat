//Import necessary functionalities
import React, { useState, useEffect } from 'react';
import { UserStatus } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserTrainingPlans = ({ selectedPet }) => {
    
    //Use useNavigate hook from React Router to establish functionality in buttons below
    const navigate = useNavigate();
    
    //Import user settings to use in data pulls
    const { loggedUser, setLoggedUser } = UserStatus();
    
    //Hold training plan info in state - initialize as null so "Please select pet" is displayed properly until there are values being held in this state
    const [trainingPlans, setTrainingPlans] = useState(null);

    //Function to pull all training plans for selected pet
    const pullPlans = async () => {
        //Reset previous training plans from other pets first
        setTrainingPlans(null);
        
        //Pull and store query parameters
        const userId = loggedUser.userId;
        const petId = selectedPet.petId; //selectedPet is an object that is {petId: petId, petName: petName}

        //Send query with user and pet parameters
        const response = await fetch(`api/plans/${userId}/${petId}`);

        //Save response in a variable to access for display
        const trainingPlansDetails = await response.json();

        if (!trainingPlansDetails[0].subscriptions) {
            setTrainingPlans(null);
        } else {
            //Remove the first element of the array (subscription status)
            trainingPlansDetails.shift();
            //Store the rest of the information in the trainingPlans state
            setTrainingPlans(trainingPlansDetails);
        }
    }

    //Use Effect to download pet plans when the selectedPet changes
    useEffect(() => {
        //Since it will run when first loaded and selectedPet will be null, specify to exit function when null
        if (!selectedPet) {
            return;
        }

        pullPlans();
    }, [selectedPet]);

    //Function to format the display of current training plans
    const displayPlans = () => {
        if (!trainingPlans) {
            return <p>There are no training plans linked to this pet!</p>
        } else {
            return trainingPlans.map((plan, index) => (
                <div key={index}>
                    <p>Skill Name: {plan.title}</p>
                    <p>Skill Status: {plan.status}</p>
                    <button onClick={() => navigate('/session', {state: {...plan, petName: selectedPet.petName }})}>Add Session</button>
                    <button onClick={() => navigate('/history', {state: {...plan, petName: selectedPet.petName }})}>View History</button>
                </div>
            )) 
        }
    }
    
    return (
        <div>
            {selectedPet
            ?   <div>
                    <h1>{selectedPet.petName}'s Training Plans</h1>
                    {displayPlans()}
                </div>
            :   <div>
                    <h1>Training Plans</h1>
                    <p>Please select a pet to view their subscribed plans</p>
                </div>}

            {/* Add New Plan button (stretch goal): Pulls up component that lists all public plans and has buttons to subscribe to that plan. Also include the "Create Plan" button so users access the form to create their own private plan */}
        </div>
    )
}

export default UserTrainingPlans;