//Import necessary functionalities
import React, { useState } from 'react';

const SessionForm = ({ state }) => {

    //State to hold all form inputs - will end up being an object with each question/answer as a key:value pair
    const [inputs, setInputs] = useState({});

    //Variable to hold the number of stages available - will use to configure form radio buttons
    const stageKeys = Object.keys(state.stages);

    //Convert highest skill status reached to number for handleSubmit function
    const skillLevel = state.status.split(" ").pop();

    //Handle change function to update input values
    const handleChange = (event) => {
        //Pull name associated with question -> will translate to column name in database
        const name = event.target.name;

        //Pull value inputted to answer field to save for form submission
        const value = event.target.value;

        //Update inputs state to hold all inputted answers
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    //States to toggle visibility of various error handling messages or form submission success message
    const [dateErrorMessage, setDateErrorMessage] = useState(false);
    const [stageErrorMessage, setStageErrorMessage] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    //Handle submit function to POST session details to server/database
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //Print out what would be the submission
        console.log("We'd be submitting now");
        console.log(inputs);

        //Check that date and stage are both submitted
        if (!inputs.date || !inputs.stage) {
            //Toggle error messages on and exit the function
            if (!inputs.date) {
                setDateErrorMessage(true);
            }

            if (!inputs.stage) {
                setStageErrorMessage(true);
            }

            setFormErrorMessage(true)
            return
        } else {
            //Clear all error messages in case they were visible from previous submission
            setDateErrorMessage(false);
            setStageErrorMessage(false);
            setFormErrorMessage(false);
        }
        
        //If "proceed" question was answered and set as true, check to see if their skill status needs to be updated - we will only update if they practiced a stage = or > than their skill level
        const newStatus = () => {
            if (inputs.proceed) {
                //If they had not previously started or practiced at their highest stage (or higher) set skill status to one level above 
                if (state.status === "Not Started" || skillLevel <= inputs.stage) {
                    const newLevel = inputs.stage + 1;
                    //If that level above is now one level above the limit, set the status to "Mastered"
                    if (newLevel > stageKeys.length) {
                        return "Mastered";
                    } else {
                        return "Stage " + newLevel;
                    }
                }
            }
        }

        //Compile request body
        const submissionData = {...inputs, subscriptionId: state.subscriptionId, status: newStatus};

        //Submit data through POST request
        try {
            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if(!response.ok) {
                //If the response has an error, trigger the client-side error message by throwing a new error
                throw new Error("Error submitting session data");
            } else {
                //If successful, show success message and clear the inputs
                setSuccessMessage(true);
                setInputs({});
            }
        } catch (error) {
            setFormErrorMessage(true);
            console.error({ message: "Oopsies, something is going wrong!", details: error });
        }
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
                    {dateErrorMessage && <p>Please enter the date this session took place.</p>}

                    <label>Which stage did you focus on today? Please select the stage you spent the most time reinforcing.</label>
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
                    {stageErrorMessage && <p>Please select which stage was practiced during this session. A selection is required.</p>}

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
                    
                    {formErrorMessage && <p>Oops! We're having trouble submitting your form. Please try again.</p>}
                    {successMessage && <p>Woohoo! Your session was submitted successfully. To view your session details, go to "View History".</p>}

                    <button type="submit">Save Session</button>
                    <button onClick={clearForm}>Cancel</button>

                    {/* Stretch goal: Implement draft functionality and add "Save Draft" button */}

                </form>
            </div>
    )
}

export default SessionForm;