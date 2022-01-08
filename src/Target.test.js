import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Target from './Target';

it('renders without crash', () => {
  render(<Target />);
});

describe('', () => {
  const chars = [
    {
      key: 'char-1',
      label: 'item-1',
    },
    {
      key: 'char-2',
      label: 'item-2',
    },
    {
      key: 'char-3',
      label: 'item-3',
    },
  ];

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
