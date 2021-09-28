import Header from './Header';

import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('Header renders with correct name', () => {
  render(<Header />);

  const name = screen.getByText(/todo-list/i);

  expect(name).toBeInTheDocument();
});
