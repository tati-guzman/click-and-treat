//Import styling sheets and functionalities
import './App.css';
import React, { useState, useContext } from 'react';


//Import all components for use in display
import ComponentContext from './UserComponentContext.js';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/HomePage.jsx';
import About from './components/About.jsx';
import Examples from './components/Examples.jsx';
import Dashboard from './components/Dashboard.jsx';
import AccountInformation from './components/AccountInformation.jsx';
import SessionForm from './components/SessionForm.jsx';
import HistoryList from './components/HistoryList.jsx';

const App = () => {
    //State to hold displayed component
    const [component, setComponent] = useState('homepage');

    //State to hold logged in user status and data
    const [loggedUser, setLoggedUser] = useState(null);

    //Function to switch between components - change to React Router!
    const chooseComponent = (component) => {
        switch (component) {
            case 'homepage':
                return <HomePage />;
            case 'about':
                return <About />;
            case 'examples':
                return <Examples />;
            case 'dashboard':
                return <Dashboard />;
            case 'account info':
                return <AccountInformation />;
            case 'session form':
                return <SessionForm />;
            case 'history':
                return <HistoryList />;
            // Need to add default state based on the user log in status!
        }
    }

    return (
        <div className="app">
            <ComponentContext.Provider value={{ display: [component, setComponent], user: [loggedUser, setLoggedUser] }}>
              <NavBar />

              {chooseComponent(component)}
            </ComponentContext.Provider>
        </div>
    )
}

export default App

