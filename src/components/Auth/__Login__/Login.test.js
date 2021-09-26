import Login from '../Login';
import { createMemoryHistory } from 'history';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

test('Login has correct texts', () => {
  const history = createMemoryHistory();
  const component = render(
    <Router history={history}>
      <Login />
    </Router>
  );

  const btn = component.getByTestId('btn-auth');
  const headline = component.getByTestId('headline');

  expect(btn.textContent).toBe('Login');
  expect(headline.textContent).toBe('Login');
  expect(component.getByText(/create an account/i)).toBeInTheDocument();
});

test('Inputs change value correctly', () => {
  const history = createMemoryHistory();
  const component = render(
    <Router history={history}>
      <Login />
    </Router>
  );

  const fields = component.getAllByTestId('input');

  fields.forEach(field => {
    act(() => {
      fireEvent.change(field, {
        target: {
          value: 'Some text',
        },
      });
    });

    expect(field.value).toBe('Some text');
  });
});
