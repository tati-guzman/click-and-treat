//Import styling sheets and functionalities
import './App.css';
import React, { useState } from 'react';

//Import all components for use in display
import NavBar from './components/NavBar.jsx';
//ADD COMPONENTS AND NAMES

const App = () => {
    //State to hold displayed component
    const [component, setComponent] = useState('homepage');

    //Function to switch between components - change to React Router!
    const chooseComponent = (component) => {
        switch (component) {
            case 'homepage':
                return <HomePage />;
        }
    }

    return (
        <div className="app">
            <NavBar setComponent={setComponent} />

            {chooseComponent(component)}
        </div>
    )
}

export default App

