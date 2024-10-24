//Import necessary functionalities and components
import React, { useContext } from 'react';
import PetInfoForm from './PetInfoForm';
import ConnectionForm from './ConnectionForm';
import UserInfoForm from './UserInfoForm';

//Import user context to pass appropriate props to each form
import UserComponentContext from '../UserComponentContext';

const AccountInformation = () => {

    //Import display and user settings to use in display control and user updates
    const { display, user } = useContext(UserComponentContext);
    const [component, setComponent] = display;
    //Need to pull appropriate information for each form from user data
    const [loggedUser, setLoggedUser] = user;


    return (
        <div>
            <h1>Account Information Page</h1>
            <p>Needs to include account info form, pet info form, and stretch goal of connecting to other users (also a form)</p>

            {/* This just requires formatting so the three forms exist but functionality is within each form */}

            <PetInfoForm />
            <UserInfoForm />
            <ConnectionForm />

        </div>
    )
}

export default AccountInformation;