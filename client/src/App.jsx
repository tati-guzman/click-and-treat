//Import styling sheets and functionalities
import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserContextProvider from './context/UserContext.jsx';

//Import all pages for use in display
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Examples from './pages/Examples.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AccountInformation from './pages/AccountInformation.jsx';
import AddSession from './pages/AddSession.jsx';
import HistoryList from './pages/HistoryList.jsx';

const App = () => {

    //Create route to use in React Router
    const router = createBrowserRouter([
        {path: "/", element: <HomePage />},
        {path: "/homepage", element: <HomePage />},
        {path: "/about", element: <About />},
        {path: "/examples", element: <Examples />},
        {path: "/dashboard", element: <Dashboard />},
        {path: "/account", element: <AccountInformation />},
        {path: "/session", element: <AddSession />},
        {path: "/history", element: <HistoryList />}
    ])

    return (
        <UserContextProvider>
            <div className="app">
                <RouterProvider router={router} />
            </div>
        </UserContextProvider>
    )
}

export default App

