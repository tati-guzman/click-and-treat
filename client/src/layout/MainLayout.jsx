import React from 'react'
import NavBar from '../components/NavBar.jsx';

const MainLayout = ({children}) => {
    return (
        <div>
            <NavBar />
            <div>{children}</div>
        </div>
    )
}

export default MainLayout