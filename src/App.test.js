import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// mock components to prevent async calls/updates
import Home from './Home';

jest.mock('./Home');

it('renders without crash', () => {
  Home.mockImplementation(() => (<div>Home</div>));
  render(<App />);
});
