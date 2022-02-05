import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Result from './Result';

// mock logic to prevent async calls/updates
import resultLogic from './resultLogic';

jest.mock('./resultLogic');

function setUp(isInvalid = false, isDupe = false) {
  const element = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );

  const submitMock = jest.fn();

  const resultManager = {
    submitScore: submitMock,
  };

  const resultStats = {
    score: 67253,
    scoreString: '1:07',
    ranking: 12,
    levelName: 'My-Level',
    isInvalid,
    isDupe,
  };

  resultLogic.loadResources.mockResolvedValue({ resultManager, resultStats });

  return { element, submitMock };
}

it('renders without crash', async () => {
  const { element } = setUp();
  await act(async () => render(element));
});

it('display a rejection for a bad session', async () => {
  const { element } = setUp(true, false);
  await act(async () => render(element));

  screen.getByText(/this session cannot be loaded/i);
});

it('display a rejection for a redeemed session', async () => {
  const { element } = setUp(false, true);
  await act(async () => render(element));

  screen.getByText(/this score has already been submitted/i);
});

it('display the score from a session', async () => {
  const { element } = setUp();
  await act(async () => render(element));

  screen.getByText(/your time was 1:07/i);
});

it('can submit a score', async () => {
  const { element, submitMock } = setUp();
  await act(async () => render(element));

  const textBox = screen.getByRole('textbox');
  fireEvent.change(textBox, { target: { value: 'Mike' } });
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.queryAllByRole('textbox').length).toBe(0);
  screen.getByText(/your score has been submitted/i);
  expect(submitMock).toHaveBeenCalled();
});
