import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// mock components to prevent async calls/updates
import Game from './Game';

jest.mock('./Game');

it('renders without crash', () => {
  Game.mockImplementation(() => (<div />));
  render(<App />);
});
