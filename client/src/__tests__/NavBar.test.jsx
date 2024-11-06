import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

import UserContextProvider, { UserStatus } from '../context/UserContext';
import NavBar from '../components/NavBar';

//Set up a mock of useNavigate by importing react router dom and then setting useNavigate to a mock state
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

//Set up a mock of UserStatus to simulate the loggedUser state
vi.mock(import('../context/UserContext'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        UserStatus: vi.fn(),
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
        //Mock UserStatus to return no users
        vi.mocked(UserStatus).mockReturnValue({
            loggedUser: null,
            setLoggedUser: vi.fn(),
        });
        
        //Render NavBar with just the router (since user context is mocked)
        render(<MemoryRouter><NavBar /></MemoryRouter>);

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
        //Mock UserStatus to return no users
        vi.mocked(UserStatus).mockReturnValue({
            loggedUser: null,
            setLoggedUser: vi.fn(),
        });
        
        //Render NavBar with just the router (since user context is mocked)
        render(<MemoryRouter><NavBar /></MemoryRouter>);

        //Find log in button and make assertion
        const logInButton = screen.getByRole('button', { name: 'Log In' });
        expect(logInButton).toBeInTheDocument();

        //Find Create an Account button and make assertion
        const createAccountButton = screen.getByRole('button', { name: 'Create an Account' });
        expect(createAccountButton).toBeInTheDocument();
    });

    test('renders Account Information and Log Out buttons if user is logged in', () => {
        //Mock UserStatus to return user data
        vi.mocked(UserStatus).mockReturnValue({
            loggedUser: { userId: 'testId' },
            setLoggedUser: vi.fn(),
        });
        
        //Render NavBar with just the router (since user context is mocked)
        render(<MemoryRouter><NavBar /></MemoryRouter>);

        //Find Account Information button and make assertion
        const accountInfoButton = screen.getByRole('button', { name: 'Account Information'});
        expect(accountInfoButton).toBeInTheDocument();

        //Find Log Out button and make assertion
        const logOutButton = screen.getByRole('button', { name: 'Log Out'});
        expect(logOutButton).toBeInTheDocument();
    });

    test('navigates to dashboard when clicking on "Click and Treat" when logged in', () => {
        //Mock UserStatus to return user data
        vi.mocked(UserStatus).mockReturnValue({
            loggedUser: { userId: 'testId' },
            setLoggedUser: vi.fn(),
        });
        
        //Render NavBar with just the router (since user context is mocked)
        render(<MemoryRouter><NavBar /></MemoryRouter>);

        // Test navigation on "Click and Treat" when logged in
        fireEvent.click(screen.getByText('Click and Treat'));
        expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
});
