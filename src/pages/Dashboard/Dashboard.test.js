import Dashboard from './Dashboard';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

test('Input search and select correctly change value', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Dashboard />
    </Router>
  );
  const input = screen.getByTestId('input-search');

  const select = screen.getByTestId('select-sort');

  expect(input.value).toBe('');
  expect(select.value).toBe('Sort by');

  act(() => {
    fireEvent.change(input, {
      target: {
        value: 'My list',
      },
    });
  });
  expect(input.value).toBe('My list');

  act(() => {
    fireEvent.change(select, {
      target: {
        value: 'latest',
      },
    });
  });

  expect(select.value).toBe('latest');
});
