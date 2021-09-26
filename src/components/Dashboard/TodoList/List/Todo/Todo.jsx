import styles from '../List.module.css';

const Todo = ({ name, isDone, id, list, setList }) => {
  const { task } = list;

  const toggleStatus = () => {
    const todo = task.find(singleTodo => singleTodo.id === id);
    todo.isDone = todo.isDone ? false : true;
    setList({ ...list, task: [...task] });
  };

  return (
    <div className={`${styles.content} ${styles.todo}`}>
      <button
        onClick={() => {
          toggleStatus();
        }}
        className={`${styles.square} ${isDone ? styles.completed : null}`}
      >
        {isDone && <i className="fas fa-check" />}
      </button>
      <p data-testid="todo-name" className={styles.task}>
        {name}
      </p>
    </div>
  );
};

export default Todo;
