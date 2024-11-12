import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserContextProvider from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import AccountInformation from '../pages/AccountInformation';

//These tests should be updated after log in component is created and this page is robust - right now there is only text in there

describe('Account Information Page', () => {
    //Testing for presence of headers without info because there is no real content in there right now
    test('renders the h1 headers that outline each section', () => {
        //Mocking logged user to access this page
        render(
            <MemoryRouter><UserContextProvider value={{loggedUser: 'user1'}}><AccountInformation /></UserContextProvider></MemoryRouter>);
        
        const headers = screen.getAllByRole('heading', { level: 1 });

        expect(headers.length).toBeGreaterThan(1);
    });

})