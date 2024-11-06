import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import UserContextProvider from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';


describe('Home Page', () => {
    //Choosing to just test for level 3 headers without specifying the words in case they change in the future
    test('renders the h3 headers for app information', () => {
        render(<MemoryRouter><UserContextProvider value={{loggedUser: null}}><HomePage /></UserContextProvider></MemoryRouter>);

        const headers = screen.getAllByRole('heading', { level: 3 });
        expect(headers.length).toBeGreaterThan(0);
      });

})