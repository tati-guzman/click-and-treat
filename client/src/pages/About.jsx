//Import necessary functionalities
import React from 'react';
import MainLayout from '../layout/MainLayout';

const About = () => {

    console.log("This is the about page!");

    return (
        <MainLayout>
            <div>
                <h1>About Page</h1>

                {/* Add in actual information as well as relevant pictures! */}
                <p>Blurb about the pages!</p>
                <p>Info about Techtonica, Tati, and Daisy!</p>
                
            </div>
        </MainLayout>
    )
}

export default About;