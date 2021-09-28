import styles from './List.module.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Todo from '../Todo/Todo';
import { useSweetState } from '../../store/sub';
import {
  getSingleList,
  createNewList,
  updateList,
  deleteList,
} from '../../api/List/listActions';

const List = ({ setOpenList, refreshLists }) => {
  const [state] = useSweetState();

  const [list, setList] = useState({
    name: '',
    task: [],
  });

  const listData = state.data;

  const [message, setMessage] = useState('');
  const [singleTask, setSingleTask] = useState({
    name: '',
    isDone: false,
  });

  const [cookies] = useCookies();
  const { user } = cookies;

  const handleAddNewTodo = () => {
    if (singleTask.name.length > 0) {
      setList({ ...list, task: [...list.task, singleTask] });
      setSingleTask({ name: '', isDone: false });
    }
  };

  const checkNameIsNotEmpty = () => {
    if (list.name.length > 0) {
      return true;
    }
    setMessage('Name of list cannot be empty');
    return false;
  };

  const closeAndUpdate = () => {
    refreshLists();
    setOpenList(false);
  };

  const handleCreateList = async () => {
    const correct = checkNameIsNotEmpty();
    if (correct) {
      await createNewList(user, list);
      closeAndUpdate();
    }
  };

  const handleUpdateList = async () => {
    const correct = checkNameIsNotEmpty();
    if (correct) {
      await updateList(user, list, state.data.id);
      closeAndUpdate();
    }
  };

  const handleDeleteList = async () => {
    await deleteList(user, state.data.id);
    closeAndUpdate();
  };

  useEffect(() => {
    if (state.data.id !== null) {
      (async () => {
        const data = await getSingleList(user, state.data.id);
        setList({ name: data.name, task: data.task });
      })();
    }
  }, [state.data.id, user]);

  return (
    <div data-testid="list" className={styles.create}>
      <div>
        <div className={styles.label}>
          <input
            onChange={e => setList({ ...list, name: e.target.value })}
            placeholder="List name"
            className={styles.field}
            type="text"
            value={list.name}
            data-testid="list-name"
          />
        </div>
        <div className={styles.containerTodos}>
          {list.task.map(({ name, isDone }, key) => (
            <Todo
              key={key}
              id={key}
              list={list}
              setList={setList}
              name={name}
              isDone={isDone}
            />
          ))}
        </div>
        <div className={styles.containerAddInput}>
          <div className={styles.content}>
            <button
              onClick={() =>
                setSingleTask({ ...singleTask, isDone: !singleTask.isDone })
              }
              className={`${styles.square} ${
                singleTask.isDone ? styles.completed : null
              }`}
            >
              {singleTask.isDone && <i className="fas fa-check" />}
            </button>
            <input
              placeholder="Task name"
              className={styles.fieldAddTask}
              type="text"
              value={singleTask.name}
              onChange={e =>
                setSingleTask({ ...singleTask, name: e.target.value })
              }
              data-testid="todo-name"
            />
          </div>
          <div className={styles.containerButtons}>
            <button
              onClick={() => setSingleTask({ name: '', isDone: false })}
              className={`${styles.btn} ${styles.btnTodo} ${styles.cancel}`}
            >
              Cancel
            </button>
            <button
              onClick={handleAddNewTodo}
              className={`${styles.btn} ${styles.btnTodo} ${styles.add}`}
            >
              Add
            </button>
            <p className={styles.message}>{message}</p>
          </div>
        </div>
      </div>
      <div className={styles.action}>
        {!listData.isNew && (
          <button
            className={`${styles.btn} ${styles.btnList} ${styles.delete}`}
            onClick={handleDeleteList}
          >
            Delete
          </button>
        )}
        <button
          onClick={() => {
            setOpenList(false);
          }}
          className={`${styles.btn} ${styles.btnList} ${styles.close}`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            listData.isNew ? handleCreateList() : handleUpdateList();
          }}
          className={`${styles.btn} ${styles.btnList} ${styles.add}`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default List;
