import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Game from './Game';
import gameLogic from './gameLogic';

jest.mock('./gameLogic');

/* it('renders without crash', async () => {
  await render(<Game />);
}); */

describe('interact with game', () => {
  const getChars = () => ({
    'char-1': {
      label: 'item-1',
      src: 'one.png',
      found: false,
    },
    'char-2': {
      label: 'item-2',
      src: 'two.png',
      found: false,
    },
    'char-3': {
      label: 'item-3',
      src: 'three.png',
      found: false,
    },
  });
  let checkTarget;

  beforeEach(async () => {
    checkTarget = jest.fn((targetKey, mouse) => Promise.resolve(true));
    gameLogic.loadResources.mockImplementation((levelKey) => Promise.resolve({
      characters: getChars(),
      imageData: { imageSrc: 'test.jpg', scale: 0.5 },
      gameManager: {
        checkTarget,
        isGameOver: jest.fn().mockResolvedValue(false),
        startTimer: jest.fn().mockResolvedValue(1000),
        stopTimer: jest.fn().mockResolvedValue(3000),
        getSessionKey: jest.fn().mockReturnValue('fake key'),
      },
    }));
    await act(async () => render(<Game levelKey="fake key" />));
  });

  it('loads the proper image', () => {
    const img = screen.getAllByRole('img')[0];
    expect(img.src).toMatch(/test.jpg/);
  });

  it('show target on first click', () => {
    const img = screen.getAllByRole('img')[0];
    fireEvent.click(img);
    // want to see buttons from the target
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('hide target on second click', () => {
    const img = screen.getAllByRole('img')[0];
    fireEvent.click(img);
    fireEvent.click(img);
    // do not want to see buttons from the target
    expect(screen.queryAllByRole('button').length).toBe(0);
  });

  it('call handler when choosing target', async () => {
    const img = screen.getAllByRole('img')[0];
    fireEvent.click(img);
    const button2 = screen.getAllByRole('button')[1];
    await act(async () => fireEvent.click(button2));

    expect(checkTarget).toHaveBeenCalled();
  });

  it('number of targets reduced after correct guess', async () => {
    const img = screen.getAllByRole('img')[0];
    fireEvent.click(img);
    const button2 = screen.getAllByRole('button')[1];
    await act(async () => fireEvent.click(button2));

    // no more target box after making a selection
    expect(screen.queryAllByRole('button').length).toBe(0);

    fireEvent.click(img);
    expect(screen.queryAllByRole('button').length).toBe(2);
  });

  it('marker and indicator appear when character is found', async () => {
    const img = screen.getAllByRole('img')[0];
    fireEvent.click(img);
    const button2 = screen.getAllByRole('button')[1];
    await act(async () => fireEvent.click(button2));

    screen.getByTestId(/marker/i);
    screen.getByText(/hit/i);
  });

  // do not test timer because time does not increase in this component
  /* it('counter is activated once game is ready', async () => {
    jest.useFakeTimers();

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });
    screen.getByText(/0:03/);

    jest.useRealTimers();
  }); */
});
