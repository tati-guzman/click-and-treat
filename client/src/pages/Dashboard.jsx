//Import necessary functionalities
import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { UserStatus } from '../context/UserContext';

//Import components to be displayed
import UserTrainingPlans from '../components/UserTrainingPlans';
import MotivationalQuotes from '../components/MotivationalQuotes';
import PetInfo from '../components/PetInfo';

const Dashboard = () => {
    
    console.log("Woohoo! You logged in to a user dashboard!");
    
   //Import user settings to use in displaying name
   const { loggedUser, setLoggedUser } = UserStatus();

   //State to hold the current pet that is being trained
   const [selectedPet, setSelectedPet] = useState(null);

    return (
        <MainLayout>
            <div className="dashboard">
                <h1>Welcome back, {loggedUser.name}!</h1>

                <div className="equal-display">
                    <UserTrainingPlans selectedPet={selectedPet}/>

                    <PetInfo setSelectedPet={setSelectedPet}/>
                </div>

                <MotivationalQuotes />
            </div>
        </MainLayout>
    )
}

export default Dashboard;