import SingleList from './SingleList';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

afterEach(() => {
  cleanup();
});

test('SingleList display correct values', () => {
  const fakeList = {
    name: 'My list',
    published_at: Date.now(),
    id: 1,
    task: [],
  };

  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SingleList
        name={fakeList.name}
        published_at={fakeList.published_at}
        id={fakeList.id}
        task={fakeList.task}
      />
    </Router>
  );
  const nameOfList = screen.getByTestId('name-of-list');
  const count = screen.getByTestId('count-list');

  expect(nameOfList.textContent).toBe('My list');
  expect(count.textContent).toBe('Completed: 0 Uncompleted: 0 All: 0');
});
