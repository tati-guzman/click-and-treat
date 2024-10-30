//Import necessary functionalities
import React, { useState } from 'react';

const SessionForm = ({ state }) => {

    //State to hold all form inputs - will end up being an object with each question/answer as a key:value pair
    const [inputs, setInputs] = useState({});

    //Variable to hold the number of stages available - will use to configure form radio buttons
    const stageKeys = Object.keys(state.stages);

    //Handle change function to update input values
    const handleChange = (event) => {
        //Pull name associated with question -> will translate to column name in database
        const name = event.target.name;

        //Pull value inputted to answer field to save for form submission
        const value = event.target.value;

        //Update inputs state to hold all inputted answers
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    //Handle submit function to POST session details to server/database
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //Print out what would be the submission
        console.log("We'd be submitting now");
        console.log(inputs);

        //Check to make sure the following are inputted: date and stage
            //If not, display error messages and don't clear any inputs

        //If date and stage are included => continue with submission logic

        //If "proceed" was included in submission, check the skill status saved in state
            //If the stage being practiced is < the highest skill status, do nothing
            //If the stage being practiced is = or > the highest skill status, send new stage status as part of POST request (adjust server side code to PUT this information in subscriptions table)

        //Submit inputs through POST request
        //POST Request should include all the inputs being sent plus the subscription id (and status if applicable)
        //{...inputs, subscriptionId: subscriptionId, status: status}

        //If there is an error with request, do not clear the page and present a message
            //Today goal: console.log the message
            //WEEK 3 STYLING GOAL: Implement client-side error handling message for this

        //If that response status is 200 OK:
            //Today goal: Display a success alert
            //WEEK 3 STYLING GOAL: Implement client-side success message
        //Also clear all the inputs

    }


    //STRETCH GOAL: Save Draft function to POST session details (with draft status) to sessions table 
    //STRETCH GOAL: Edit handle submit function to PUT session details while editing prior sessions

    //Clear function to clear all input values
    const clearForm = () => {
        //Clear input state, which should also clear input fields
        setInputs({});
    }

    //Form questions: Date (required), Stage (required - ADD FORM HANDLING TO ENSURE IT IS REQUIRED), Tasks (text), Notes (text), Proceed (bool), draft (bool - omit for now), subscription_id (required in submission)

    //To-Do: Update handleSubmit to POST all the information && update server POST request to also update the status in the subscriptions table if the proceed column is true
    
    return (
            <div>
                <h3>Today's Session Details</h3>

                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="date">Date of Training Session</label>
                    <input 
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={inputs.date || ""}
                        onChange={handleChange}
                    />

                    <label>Stage</label>
                    {
                        stageKeys.map((stage, index) => (
                            <div key={index}>
                                <label key={index}>
                                    <input
                                    id={stage}
                                    name="stage"
                                    type="radio"
                                    value={index + 1}
                                    checked={(inputs.stage === (index + 1).toString())}
                                    onChange={handleChange}
                                    />
                                    {index + 1}
                                    </label>
                            </div>
                        ))
                    }

                    <label htmlFor="tasks">Which tasks did you complete today?</label>
                    <textarea 
                        id="tasks"
                        name="tasks"
                        value={inputs.tasks || ""}
                        onChange={handleChange}
                        placeholder="e.g. Practiced lure back and forth between legs 10 times"
                    />

                    <label htmlFor="notes">Notes: </label>
                    <textarea 
                        id="notes"
                        name="notes"
                        value={inputs.notes || ""}
                        onChange={handleChange}
                        placeholder="Was there any confusion? Any successes to highlight?"
                    />

                    {state.status !== "Mastered" 
                    ?   <div>
                            <label>Are you and {state.petName} ready for the next stage?</label>
                            <label htmlFor="yes-proceed"><input 
                                id="yes-proceed"
                                name="proceed"
                                type="radio"
                                value="true"
                                checked={inputs.proceed === true}
                                onChange={() => setInputs(prevInputs => ({ ...prevInputs, "proceed": true }))}
                            />Yes</label>
                            <label htmlFor="no-proceed"><input 
                                id="no-proceed"
                                name="proceed"
                                type="radio"
                                value="false"
                                checked={inputs.proceed === false}
                                onChange={() => setInputs(prevInputs => ({ ...prevInputs, "proceed": false }))}
                            />No</label>
                        </div>
                    :   null }
                    
                    <button type="submit">Save Session</button>
                    <button onClick={clearForm}>Cancel</button>

                    {/* Stretch goal: Implement draft functionality and add "Save Draft" button */}

                </form>
            </div>
    )
}

export default SessionForm;