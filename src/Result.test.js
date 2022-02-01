import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Result from './Result';

// mock logic to prevent async calls/updates
// import resultLogic from './resultLogic';

function setUp() {
  // Game.mockReturnValue((<div />));
  const element = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );

  return { element };
}

it('renders without crash', async () => {
  const { element } = setUp();
  await act(async () => render(element));
});

it.todo('display a rejection for bad/used session');
it.todo('display the score from a session');
it.todo('display a textbox to submit score');
it.todo('can submit a score');
