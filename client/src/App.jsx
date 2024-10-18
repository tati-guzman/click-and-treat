//Import styling sheets and functionalities
import './App.css';
import React, { useState } from 'react';

//Import all components for use in display
import NavBar from './components/NavBar.jsx';
import HomePage from './components/HomePage.jsx';
import About from './components/About.jsx';
import Examples from './components/Examples.jsx';
//ADD COMPONENTS AND NAMES

const App = () => {
    //State to hold displayed component
    const [component, setComponent] = useState('homepage');

    //Function to switch between components - change to React Router!
    const chooseComponent = (component) => {
        switch (component) {
            case 'homepage':
                return <HomePage setComponent={setComponent} />;
            case 'about':
                return <About />;
            case 'examples':
                return <Examples />;
            case 'dashboard':
                return <Dashboard />;
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

