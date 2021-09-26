import Dashboard from '../Dashboard';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('Input search and select correctly change value', () => {
  const component = render(<Dashboard />);
  const input = component.getByTestId('input-search');

  const select = component.getByTestId('select-sort');

  expect(input.value).toBe('');
  expect(select.value).toBe('Sort by');

  fireEvent.change(input, {
    target: {
      value: 'My list',
    },
  });
  expect(input.value).toBe('My list');

  fireEvent.change(select, {
    target: {
      value: 'latest',
    },
  });

  expect(select.value).toBe('latest');
});
