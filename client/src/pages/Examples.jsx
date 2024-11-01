//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';

const Examples = () => {
    
    //Object holding the staging information from the database for Middle
    const middleStages = {
            "Stage 1": "Your pet should feel comfortable going through your legs. Throw treats back and forth. Lure them if necessary but no need to click. Move on to the next stage once they are comfortable walking through your legs.",
            "Stage 2": "Your pet should learn to pause when they are right underneath you. Hold a high value treat in one hand and lure them through your legs (approaching from behind you). Click and treat when they are just underneath you. Throw a treat away from you to reset.",
            "Stage 3": "Your pet should learn to sit after pausing between your legs. Lure them through your legs, pause, and stand up straight. Click when they sit and reward generously. You may need to cue the sit at first. Only move forward once they are quickly sitting without being cued.",
            "Stage 4": "Add the cue to remove the lure. Say the cue and turn away from your pet. Click and reward generously when they sit between your legs. Throw a treat away from you to reset. Do several repetitions of this confidently before moving on to the next stage.",
            "Stage 5": "Proof the cue! Begin practicing this in various different environments (e.g. with a leash on, in the yard, during walks). Always make sure your dog is below threshold before testing out in new environments."
        };
    //Convert object into array to map through for display
    const middleStagesArray = Object.entries(middleStages);
    
    return (
        <MainLayout>
            <div className="general">
                <h1>What's in a Training Plan?</h1>
                <p>Each training plans offers a description of the skill being taught and a breakdown of each stage your pet should be comfortable in before moving forward. For example, it's hard to get your dog to sit between your legs if they're not comfortable even walking through them! Our plan for "Middle" details each stage to set you and your pet up for success as you take on the challenge.</p>

                <h3>Currently Offered Plans</h3>
                <h4>Middle: This cue should result in your pet sitting between your legs facing forward.</h4>

                {middleStagesArray.map((stage, index) => (
                    <div key={index}>
                        <h3>{stage[0]}:</h3>
                        <p>{stage[1]}</p>
                    </div>
                ))}
                
                <h3>Other Plans Coming Soon</h3>
                <h4>Touch: This cue should result in your pet pressing their nose against your palm or fingers.</h4>
                <h4>Name Game: Helpful for renaming/welcoming new pets or recall, this plan makes their name an exciting and reliable cue!</h4>
            </div>
        </MainLayout>
    )
}

export default Examples;