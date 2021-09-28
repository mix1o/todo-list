import List from './List';

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('List component renders correct', () => {
  render(<List />);

  expect(screen.getByText(/add/i)).toBeInTheDocument();
  expect(screen.getByText(/save/i)).toBeInTheDocument();

  act(() => {
    fireEvent.change(screen.getByTestId('list-name'), {
      target: {
        value: 'New list',
      },
    });
  });

  expect(screen.getByTestId('list-name').value).toBe('New list');

  act(() => {
    fireEvent.change(screen.getByTestId('todo-name'), {
      target: {
        value: 'New todo',
      },
    });
  });

  expect(screen.getByTestId('todo-name').value).toBe('New todo');
});
