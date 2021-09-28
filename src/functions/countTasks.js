export const countTasks = task => {
  const completed = task.filter(task => task.isDone === true);
  const unCompleted = task.filter(task => task.isDone === false);

  return `Completed: ${completed.length} Uncompleted: ${unCompleted.length} All: ${task.length}`;
};
