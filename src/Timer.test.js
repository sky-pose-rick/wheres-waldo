import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Timer from './Timer';

describe('', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crash', async () => {
    await render(<Timer />);
  });

  it('render 0:00 upon creation', async () => {
    await render(<Timer />);

    screen.getByText(/0:00/);
  });

  it('display correct duration', async () => {
    jest.useFakeTimers();
    await render(<Timer />);

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    screen.getByText(/0:03/);
    await act(async () => {
      jest.advanceTimersByTime(70000);
    });
    screen.getByText(/1:13/);
  });
});
