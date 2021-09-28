import Login from './Login';
import { createMemoryHistory } from 'history';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

test('Login has correct texts', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  const btn = screen.getByTestId('btn-auth');
  const headline = screen.getByTestId('headline');

  expect(btn.textContent).toBe('Login');
  expect(headline.textContent).toBe('Login');
  expect(screen.getByText(/create an account/i)).toBeInTheDocument();
});

test('Inputs change value correctly', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(screen.getByTestId('login-field')).toBeInTheDocument();

  act(() => {
    fireEvent.change(screen.getByTestId('login-field'), {
      target: {
        value: 'Some text',
      },
    });
  });

  expect(screen.getByTestId('login-field').value).toBe('Some text');
});
