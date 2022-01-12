import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Home from './Home';

// mock logic to prevent async calls/updates
import homeLogic from './homeLogic';

jest.mock('./homeLogic');

function setUp() {
  // Game.mockReturnValue((<div />));
  const element = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );

  const levels = [
    {
      name: 'level1',
      key: 'key-1',
      scores: [
        {
          name: 'guy1',
          score: 50,
          scoreKey: 'score-1',
        },
        {
          name: 'guy2',
          score: 75,
          scoreKey: 'score-2',
        },
        {
          name: 'guy3',
          score: 150,
          scoreKey: 'score-3',
        },
      ],
    },
    {
      name: 'level2',
      key: 'second',
      scores: [
        {
          name: 'Leader',
          score: 0,
          scoreKey: 'best-score',
        },
      ],

    },
  ];

  // mock implementation for homeLogic
  homeLogic.loadResources.mockResolvedValue({ resources: { levels } });

  return { element };
}

it('renders without crash', async () => {
  const { element } = setUp();
  await act(async () => render(element));
});

it('has a link to levels', async () => {
  const { element } = setUp();
  await act(async () => render(element));

  const navLink = screen.getAllByRole('link')[1];
  expect(navLink.href).toMatch(/play\/second/);
});

/* it('has a table of highscores', async () => {
  const { element } = setUp();
  await act(async () => render(element));
  screen.getByText(/leader/i);
}); */

it('show/hide highscore table', async () => {
  const { element } = setUp();
  await act(async () => render(element));
  const button = screen.getAllByRole('button')[0];
  fireEvent.click(button);
  screen.getByText(/guy2/i);
  fireEvent.click(button);
  expect(screen.queryAllByText(/guy2/i).length).toBe(0);
});
