import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// mock components to prevent async calls/updates
import Game from './Game';
import Home from './Home';

jest.mock('./Game');
jest.mock('./Home');

it('renders without crash', () => {
  Game.mockImplementation(() => (<div>Game</div>));
  Home.mockImplementation(() => (<div>Home</div>));
  render(<App />);
});
