import { useState } from 'react';
import SingleList from '../SingleList';
import List from '../../List/List';

import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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

  const component = render(
    <SingleList
      name={fakeList.name}
      published_at={fakeList.published_at}
      id={fakeList.id}
      task={fakeList.task}
    />
  );
  const nameOfList = component.getByTestId('name-of-list');
  const count = component.getByTestId('count-list');

  expect(nameOfList.textContent).toBe('My list');
  expect(count.textContent).toBe('Completed: 0 Uncompleted: 0 All: 0');
});
