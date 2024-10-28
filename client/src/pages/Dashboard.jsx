//Import necessary functionalities
import React from 'react';
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

    return (
        <MainLayout>
            <div>
                <h1>Dashboard Component</h1>

                <h2>Welcome back, {loggedUser.name}!</h2>

                <PetInfo />
    
                <UserTrainingPlans />

                <MotivationalQuotes />
            </div>
        </MainLayout>
    )
}

export default Dashboard;