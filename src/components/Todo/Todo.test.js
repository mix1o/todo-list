import Todo from './Todo';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('Todo component displays correct values ', () => {
  const fakeTodo = {
    id: 1,
    name: 'My todo',
    isDone: false,
    list: {
      name: 'First list',
      task: [
        {
          name: 'My todo',
          isDone: false,
        },
      ],
    },
  };

  render(
    <Todo
      id={fakeTodo.id}
      name={fakeTodo.name}
      isDone={fakeTodo.isDone}
      list={fakeTodo.list}
    />
  );

  const todoName = screen.getByTestId('todo-name');

  expect(todoName.textContent).toBe('My todo');
});
