import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App.jsx';

describe ('App', () => {
    test ('App renders without crashing', () => {
        render(<App />);
    })
})