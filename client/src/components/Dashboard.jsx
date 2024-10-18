//Import necessary functionalities
import React, { useContext } from 'react';
import ComponentContext from '../ComponentContext.js';

//Import components to be displayed
import UserTrainingPlans from './UserTrainingPlans';
import MotivationalQuotes from './MotivationalQuotes';

const Dashboard = () => {
    
    console.log("Woohoo! You logged in to a user dashboard!");

    const { setComponent } = useContext(ComponentContext);

    return (
        <div>
           <h1>Dashboard Component:</h1>

           {/* Move this button to the navbar and show as avatar instead? */}
           <button onClick={() => setComponent('account info')}>Account Information</button>

           <h3>Pet Info - name, current primary goal</h3>
           <button onClick={() => setComponent('account info')}>Add More Pets (send to account info component)</button>
           
           <UserTrainingPlans />

           <MotivationalQuotes />

        </div>
    )
}

export default Dashboard;