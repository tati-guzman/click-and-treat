//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';

const HomePage = () => {

    return (
        <MainLayout>
            <div>
            {/* Remove this header when implementing real info */}
            <h1>Home Page</h1>

            {/* Place this is in its own div to format on left hand side of the page */}
            <h1>Header</h1>
            <p>Blurb about the site and dog training</p>

            </div>

        </MainLayout>
        
    )
}

export default HomePage;