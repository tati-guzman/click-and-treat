//Import styling sheets and functionalities
import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Import all pages for use in display
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Examples from './pages/Examples.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AccountInformation from './pages/AccountInformation.jsx';
import SessionForm from './pages/SessionForm.jsx';
import HistoryList from './pages/HistoryList.jsx';

const App = () => {
    //State to hold logged in user status and data
    // const [loggedUser, setLoggedUser] = useState(null);

    const router = createBrowserRouter([
        {path: "/", element: <HomePage />},
        {path: "/homepage", element: <HomePage />},
        {path: "/about", element: <About />},
        {path: "/examples", element: <Examples />},
        {path: "/dashboard", element: <Dashboard />},
        {path: "/account", element: <AccountInformation />},
        {path: "/session", element: <SessionForm />},
        {path: "/history", element: <HistoryList />}
    ])

    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    )
}

export default App

