import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

import UserContextProvider from '../context/UserContext';
// import { UserStatus } from '../context/UserContext.jsx';
import NavBar from '../components/NavBar';
// import LogIn from '../components/LogIn';

//Set up a mock of useNavigate by importing react router dom and then setting useNavigate to a mock state
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});


describe('Navigation Bar', () => {
    //Create a variable to hold the mock navigation with the same name as what is in the code before each test
    let navigate;

    beforeEach(() => {
      navigate = vi.fn();
      vi.mocked(useNavigate).mockReturnValue(navigate);
    });
    
    //Reset all mock data after each test
    afterEach(() => {
      vi.clearAllMocks();
    });

    test('navigates to the correct page when clicking on navigation items', () => {
        //Check navigation if there is no logged user
        render(<MemoryRouter><UserContextProvider value={{ loggedUser: null }}><NavBar /></UserContextProvider></MemoryRouter>
        );

        //'Click and Treat' is the logo stand in that should return home
        fireEvent.click(screen.getByText('Click and Treat'));
        expect(navigate).toHaveBeenCalledWith('/homepage');

        //Navigation to About Page
        fireEvent.click(screen.getByText('About'));
        expect(navigate).toHaveBeenCalledWith('/about');

        //Navigation to Example Training Plans page
        fireEvent.click(screen.getByText('Example Training Plans'));
        expect(navigate).toHaveBeenCalledWith('/examples');
    });

    test('renders Log In and Create an Account buttons when loggedUser is null', () => {
        //Rendering with loggedUser as null
        render(<MemoryRouter><UserContextProvider value={{ loggedUser: null }}><NavBar /></UserContextProvider></MemoryRouter>
        );

        //Find log in button and make assertion
        const logInButton = screen.getByRole('button', { name: 'Log In' });
        expect(logInButton).toBeInTheDocument();

        //Find Create an Account button and make assertion
        const createAccountButton = screen.getByRole('button', { name: 'Create an Account' });
        expect(createAccountButton).toBeInTheDocument();
    });

});
