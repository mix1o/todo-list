import styles from './List.module.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Todo from './Todo/Todo';
import { useSweetState } from '../../../../store/sub';

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

  const getSingleList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/to-do-lists/${listData.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`,
        },
      }
    );

    const json = await response.json();
    setList({ name: json.name, task: json.task });
  };

  const checkNameIsNotEmpty = x => {
    if (list.name.length > 0) {
      return true;
    } else {
      setMessage('Name of list cannot be empty');
      return false;
    }
  };

  const closeAndUpdate = () => {
    refreshLists();
    setOpenList(false);
  };

  const handleCreateList = async () => {
    const correct = checkNameIsNotEmpty();
    if (correct) {
      await fetch(`${process.env.REACT_APP_API}/to-do-lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify(list),
      });

      closeAndUpdate();
    }
  };

  const handleUpdateList = async () => {
    const correct = checkNameIsNotEmpty();
    if (correct) {
      await fetch(`${process.env.REACT_APP_API}/to-do-lists/${state.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify(list),
      });
      closeAndUpdate();
    }
  };

  const handleDeleteList = async () => {
    await fetch(`${process.env.REACT_APP_API}/to-do-lists/${state.data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.jwt}`,
      },
    });

    closeAndUpdate();
  };

  useEffect(() => {
    if (state.data.id !== null) getSingleList();
  }, []);

  return (
    <div className={styles.create}>
      <div>
        <label className={styles.label}>
          <input
            onChange={e => setList({ ...list, name: e.target.value })}
            placeholder="List name"
            className={styles.field}
            type="text"
            value={list.name}
          />
        </label>
        <div className={styles.containerTodos}>
          {list.task.map(({ name, isDone, id }, key) => (
            <Todo
              key={key}
              list={list}
              setList={setList}
              name={name}
              isDone={isDone}
              id={id}
            />
          ))}
        </div>
        <div className={styles.containerAddInput}>
          <label>
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
              />
            </div>
            <div className={styles.containerButtons}>
              <button
                onClick={() => setSingleTask({ name: '', isDone: false })}
                className={`${styles.btn} ${styles.cancel}`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewTodo}
                className={`${styles.btn} ${styles.add}`}
              >
                Add
              </button>
              <p className={styles.message}>{message}</p>
            </div>
          </label>
        </div>
      </div>
      <div className={styles.action}>
        {!listData.isNew && (
          <button
            className={`${styles.btn} ${styles.delete}`}
            onClick={handleDeleteList}
          >
            Delete
          </button>
        )}
        <button
          onClick={() => {
            setOpenList(false);
          }}
          className={`${styles.btn} ${styles.close}`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            listData.isNew ? handleCreateList() : handleUpdateList();
          }}
          className={`${styles.btn} ${styles.add}`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default List;
