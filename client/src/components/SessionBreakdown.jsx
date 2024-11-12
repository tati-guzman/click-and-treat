//Import necessary functionalities
import React from 'react';

const SessionBreakdown = ({ state }) => {

    //Function to format display of trick stages from JSONB pulled from database
    const displayStages = () => {
        //Pull stage information from data sent from UserTrainingPlans
        const stages = state.stages;

        //Create array from the object retrieved from the database
        const stageDetails = Object.entries(stages);
        //[["stage 1", "details"], ["stage 2", "details"]]

        return stageDetails.map((stage, index) => (
            <div className="card" key={index}>
                <h3>{stage[0]}:</h3>
                <p>{stage[1]}</p>
            </div>
        ))
    }
  
    return (
            <div className="list">
                <h2>Training Stages & Details</h2>

                <div>
                    {displayStages()}
                </div>
            </div>
    )
}

export default SessionBreakdown;