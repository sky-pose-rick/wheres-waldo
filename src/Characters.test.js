import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Characters from './Characters';

it('renders without crash', () => {
  render(<Characters />);
});

describe('', () => {
  const chars = [
    {
      key: 'char-1',
      label: 'item-1',
      src: 'one.png',
      found: false,
    },
    {
      key: 'char-2',
      label: 'item-2',
      src: 'one.png',
      found: true,
    },
    {
      key: 'char-3',
      label: 'item-3',
      src: 'one.png',
      found: false,
    },
  ];

  beforeEach(() => {
    render(<Characters chars={chars} />);
  });

  it('renders list elements', () => {
    screen.getAllByText('item-2');
  });

  it('has image icons', () => {
    screen.getAllByRole('img');
  });
});
