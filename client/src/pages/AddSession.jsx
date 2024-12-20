//Import necessary functionalities
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import SessionBreakdown from '../components/SessionBreakdown';
import SessionForm from '../components/SessionForm';

const AddSession = () => {
    
    //Call useLocation hook to import all the data sent from UserTrainingPlans component
    //state holds the following info from UserTrainingPlans: subscription_id, user_id, pet_id, plan_id, status, last_updated, title, petName, stages
    const { state } = useLocation();
    
    return (
        <MainLayout>
            <div className="general">
                <h1>{state.petName}'s Training Session for "{state.title}"</h1>
                <h2>Highest Skill Status Reached: {state.status}</h2>
                
                <div className="equal-display">
                    <SessionBreakdown state={state} />

                    <SessionForm state={state} />
                </div>

            </div>
        </MainLayout>
    )
}

export default AddSession;