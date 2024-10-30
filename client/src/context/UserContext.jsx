//Import required React functionality
import { createContext, useContext, useState } from 'react';

//Create context for which component we should be seeing
const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);

    //Potentially use the following useEffect (remember to import functionality) to combat user getting logged out on refresh:
    
    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //     if (user) {
    //         setLoggedUser(user);
    //     }
    // }, []);

    return (
        <UserContext.Provider value = {{ loggedUser, setLoggedUser }}>
            {children}
        </UserContext.Provider>
    )

}

//Export for use throughout components
export default UserContextProvider;

export const UserStatus = () => {
    return useContext(UserContext);
}
