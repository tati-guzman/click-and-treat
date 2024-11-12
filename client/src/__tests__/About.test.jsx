import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserContextProvider from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About';


describe('About Page', () => {
    //Testing just for headers again so specific content can change
    test('renders the h1 headers for about information', () => {
      //Mocking no logged user
        render(<MemoryRouter><UserContextProvider value={{loggedUser: null}}><About /></UserContextProvider></MemoryRouter>);

        const headers = screen.getAllByRole('heading', { level: 1 });
        expect(headers.length).toBeGreaterThan(0);
      });

})