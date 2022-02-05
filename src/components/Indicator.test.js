import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Indicator from './Indicator';

it('renders without crash', () => {
  render(<Indicator />);
});

it('displays indicator for correct guess', async () => {
  const lastGuess = { correct: true, timestamp: 1 };
  await act(async () => render(<Indicator lastGuess={lastGuess} />));

  screen.getByText(/hit/i);
});

it('displays indicator for wrong guess', async () => {
  const lastGuess = { correct: false, timestamp: 1 };
  await act(async () => render(<Indicator lastGuess={lastGuess} />));

  screen.getByText(/miss/i);
});

it('displays indicator expires', async () => {
  jest.useFakeTimers();
  const lastGuess = { correct: true, timestamp: 1 };
  await act(async () => render(<Indicator lastGuess={lastGuess} />));

  await act(async () => jest.advanceTimersByTime(3000));
  expect(screen.queryAllByText(/hit/i).length).toBe(0);
  jest.useRealTimers();
});
