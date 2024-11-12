import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import UserContextProvider from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import Examples from '../pages/Examples';


describe('Example Training Plans', () => {
    //Testing singular h1 header without content specification
    test('renders the main h1 header for example training plans', () => {
        //Mocking no logged user
        render(
            <MemoryRouter><UserContextProvider value={{loggedUser: null}}><Examples /></UserContextProvider></MemoryRouter>);
        
        //Grabbing just the examples page (ignores nav bar)
        const examplesPage = screen.getByTestId('examples-page');

        //Query for the h1 inside the examplesPage div
        const mainHeader = within(examplesPage).getByRole('heading', { level: 1 });
        
        //Assert that the header is rendered
        expect(mainHeader).toBeInTheDocument();
    });

})