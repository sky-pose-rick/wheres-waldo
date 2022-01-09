import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Target from './Target';

it('renders without crash', () => {
  render(<Target />);
});

describe('', () => {
  const chars = {
    'char-1': { label: 'item-1' },
    'char-2': { label: 'item-2' },
    'char-3': { label: 'item-3' },
  };

  const onSelect = jest.fn((arg) => arg);

  beforeEach(() => {
    render(<Target chars={chars} onSelect={onSelect} />);
  });

  it('renders list elements', () => {
    screen.getAllByText('item-2');
  });

  it('function called when clicking button', () => {
    const button = screen.getAllByRole('button')[1];
    fireEvent.click(button);
    expect(onSelect.mock.calls[0][0]).toEqual('char-2');
  });
});

it('do not display targets that are found', () => {
  const chars = {
    'char-1': { label: 'item-1', found: true },
    'char-2': { label: 'item-2' },
    'char-3': { label: 'item-3', found: true },
  };

  render(<Target chars={chars} />);
  expect(screen.getAllByRole('button').length).toBe(1);
});
