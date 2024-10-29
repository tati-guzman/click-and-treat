//Import necessary functionalities
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const SessionForm = () => {

    //Use useNavigate hook from React Router to establish functionality in buttons below
    const navigate = useNavigate();
    
    //Call useLocation hook to import all the data sent from UserTrainingPlans component
    //state holds the following info from UserTrainingPlans: subscription_id, user_id, pet_id, plan_id, status, last_updated, title, petName, stages
    const { state } = useLocation();

    //Function to format display of trick stages from JSONB pulled from database
    const displayStages = () => {
        //Pull stage information from data sent from UserTrainingPlans
        const stages = state.stages;

        //Create array with 
        const stageDetails = Object.entries(stages);
        //[["stage 1", "details"], ["stage 2", "details"]]

        return stageDetails.map((stage, index) => (
            <div key={index}>
                <h3>{stage[0]}:</h3>
                <p>{stage[1]}</p>
            </div>
        ))
    }

    //Handle submit function to POST session details to server/database

    //STRETCH GOAL: Save Draft function to POST session details (with draft status) to sessions table 
    //STRETCH GOAL: Edit handle submit function to PUT session details while editing prior sessions

    //Clear function to clear all input values

    return (
        <MainLayout>
            <div>
                <h1>{state.petName}'s Training Session</h1>
                <h2>Skill Name: {state.title}</h2>
                <h3>Training Stages & Details</h3>

                <div>
                    {displayStages()}
                </div>
                
                <p>Insert form here to gather all session details: date, notes, question about moving on to next stage</p>

                {/* Buttons to submit session, save as draft, or cancel input */}
                <button onClick={() => navigate('/history/')}>View History</button>
            </div>
        </MainLayout>
    )
}

export default SessionForm;