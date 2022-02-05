import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Characters from './Characters';

it('renders without crash', () => {
  render(<Characters />);
});

describe('', () => {
  const chars = {
    'char-1': {
      label: 'item-1',
      src: 'one.png',
      found: true,
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
  };

  beforeEach(() => {
    render(<Characters chars={chars} />);
  });

  it('renders list elements', () => {
    screen.getAllByText('item-2');
  });

  it('has image icons', () => {
    screen.getAllByRole('img');
  });

  it.todo('different appearance for found items');
});
