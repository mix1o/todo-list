import styles from './Todo.module.css';

const Todo = ({ name, isDone, id, list, setList }) => {
  const { task } = list;

  const toggleStatus = () => {
    task[id].isDone = task[id].isDone ? false : true;
    setList({ ...list, task: [...task] });
  };

  const deleteTodo = () => {
    const newTodos = [...task];

    newTodos.splice(id, 1);

    setList({ ...list, task: newTodos });
  };

  return (
    <div className={`${styles.content} ${styles.todo}`}>
      <button
        onClick={toggleStatus}
        className={`${styles.square} ${isDone ? styles.completed : null}`}
      >
        {isDone && <i className="fas fa-check" />}
      </button>
      <p data-testid="todo-name" className={styles.task}>
        {name}
      </p>
      <button className={styles.delete} onClick={deleteTodo}>
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

export default Todo;
