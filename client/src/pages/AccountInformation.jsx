//Import necessary functionalities and components
import React, { useContext } from 'react';
import PetInfoForm from '../components/PetInfoForm';
import ConnectionForm from '../components/ConnectionForm';
import UserInfoForm from '../components/UserInfoForm';
import MainLayout from '../layout/MainLayout';

const AccountInformation = () => {

    return (
        <MainLayout>
            <div>
                <h1>Account Information Page</h1>
                <p>Needs to include account info form, pet info form, and stretch goal of connecting to other users (also a form)</p>

                {/* This just requires formatting so the three forms exist but functionality is within each form */}

                <PetInfoForm />
                <UserInfoForm />
                <ConnectionForm />

            </div>
        </MainLayout>
    )
}

export default AccountInformation;