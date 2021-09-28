export const formatDate = published_at => {
  const date = new Date(published_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${day}-${month}-${year}`;
};

export const countTasks = task => {
  const completed = task.filter(task => task.isDone === true);
  const unCompleted = task.filter(task => task.isDone === false);

  return `Completed: ${completed.length} Uncompleted: ${unCompleted.length} All: ${task.length}`;
};
