//Import necessary functionalities and components
import React from 'react';
import PetInfoForm from './PetInfoForm';
import ConnectionForm from './ConnectionForm';
import UserInfoForm from './UserInfoForm';

const AccountInformation = () => {

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