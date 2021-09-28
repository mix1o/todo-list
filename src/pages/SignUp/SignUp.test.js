import SignUp from './SignUp';
import { createMemoryHistory } from 'history';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

test('SingUp has correct texts', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SignUp />
    </Router>
  );

  const btn = screen.getByTestId('btn-auth');

  expect(screen.getByText(/create an new account/i)).toBeInTheDocument();
  expect(btn.textContent).toBe('Create');
});

test('Form validation works and inputs change text correctly', async () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <SignUp />
    </Router>
  );

  const btn = screen.getByTestId('btn-auth');
  const username = screen.getByTestId('username');
  const messages = screen.getAllByTestId('message-validation');

  act(() => {
    fireEvent.click(btn);
  });

  await waitFor(() =>
    expect(messages[0].textContent).toBe('Field is required')
  );

  act(() => {
    fireEvent.change(username, {
      target: {
        value: 'user',
      },
    });
  });

  expect(username.value).toBe('user');
});
