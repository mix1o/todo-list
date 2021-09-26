import SignUp from '../SignUp';
import { createMemoryHistory } from 'history';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

test('SingUp has correct texts', () => {
  const history = createMemoryHistory();
  const component = render(
    <Router history={history}>
      <SignUp />
    </Router>
  );

  const fields = component.getAllByTestId('input');
  const btn = component.getByTestId('btn-auth');

  expect(component.getByText(/create an new account/i)).toBeInTheDocument();
  expect(btn.textContent).toBe('Create');

  fields.forEach(field => expect(field.value).toBe(''));
});

test('Form validation works and inputs change text correctly', async () => {
  const history = createMemoryHistory();

  const component = render(
    <Router history={history}>
      <SignUp />
    </Router>
  );

  const btn = component.getByTestId('btn-auth');
  const fields = component.getAllByTestId('input');
  const messages = component.getAllByTestId('message-validation');

  fireEvent.click(btn);

  messages.forEach(
    async message =>
      await waitFor(() => expect(message.textContent).toBe('Field is required'))
  );

  fields.forEach(field => {
    fireEvent.change(field, {
      target: {
        value: 'Some text',
      },
    });

    expect(field.value).toBe('Some text');
  });
});
