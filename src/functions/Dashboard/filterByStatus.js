export const filterByStatus = (firstElement, secondElement) => {
  const firstCompleted = firstElement.task.filter(todo => todo.isDone === true);
  const secondCompleted = secondElement.task.filter(
    todo => todo.isDone === true
  );

  return { firstCompleted, secondCompleted };
};
