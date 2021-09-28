export const countTasks = tasks => {
  const completed = tasks.filter(task => task.isDone === true);
  const unCompleted = tasks.filter(task => task.isDone === false);

  return {
    completed: completed.length,
    unCompleted: unCompleted.length,
    all: tasks.length,
  };
};
