import Header from '../Header';

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('Header renders with correct name', () => {
  const component = render(<Header />);

  const name = component.getByText(/todo-list/i);

  expect(name).toBeInTheDocument();
});
