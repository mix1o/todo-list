import List from '../List';

import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('', () => {
  const component = render(<List />);

  const inputs = component.getAllByTestId('input');
  //   const nameTodo = component.getByTestId('nameTodo');

  inputs.forEach(field => {
    expect(field).toBeInTheDocument();
  });
  inputs.forEach(field => {
    fireEvent.change(field, {
      target: {
        value: 'New value',
      },
    });
    expect(field.value).toBe('New value');
  });

  expect(component.getByText(/save/i)).toBeInTheDocument();
  expect(component.getByText(/add/i)).toBeInTheDocument();
  const btns = component.getAllByText(/cancel/i);
  btns.forEach(btn => {
    expect(btn).toBeInTheDocument();
  });
});
