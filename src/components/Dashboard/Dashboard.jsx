import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSweetState } from '../../store/sub';
import Header from '../Header/Header';
import styles from './Dashboard.module.css';
import List from './TodoList/List/List';
import SingleList from './TodoList/SingleList/SingleList';

const Dashboard = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const [, actions] = useSweetState();
  const [openList, setOpenList] = useState(false);

  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [sortOption, setSortOption] = useState('Sort by');

  const [lists, setLists] = useState([]);

  const [hasError, setHasError] = useState(false);

  const getLists = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/to-do-lists`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
      });

      const json = await response.json();

      setLists(json);
    } catch {
      setHasError(true);
    }
  };

  const handleSearchLists = list => {
    return list.name.toLowerCase().includes(searchKeyWord.toLowerCase());
  };

  const filterByStatus = (firstElement, secondElement) => {
    const firstCompleted = firstElement.task.filter(
      todo => todo.isDone === true
    );
    const secondCompleted = secondElement.task.filter(
      todo => todo.isDone === true
    );

    return { firstCompleted, secondCompleted };
  };

  const handleSortLists = (firstElement, secondElement) => {
    const completed = filterByStatus(firstElement, secondElement);
    switch (sortOption) {
      case 'completed':
        return (
          completed.secondCompleted.length - completed.firstCompleted.length
        );

      case 'uncompleted':
        return (
          completed.firstCompleted.length - completed.secondCompleted.length
        );

      case 'latest':
        return new Date(firstElement.published_at) >
          new Date(secondElement.published_at)
          ? -1
          : 1;
      case 'amount':
        return secondElement.task.length - firstElement.task.length;
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      {openList && <List refreshLists={getLists} setOpenList={setOpenList} />}
      {!hasError && (
        <section
          onClick={() => {
            if (openList) setOpenList(false);
          }}
          className={`${styles.dashboard} ${openList ? styles.blur : null}`}
        >
          <Header />
          <div className={styles.main}>
            <div className={styles.header}>
              <label className={styles.label}>
                <input
                  data-testid="input-search"
                  className={styles.field}
                  placeholder="Search"
                  type="text"
                  value={searchKeyWord}
                  onChange={e => setSearchKeyWord(e.target.value)}
                />
              </label>
              <label className={styles.labelSelect}>
                <select
                  data-testid="select-sort"
                  onChange={e => setSortOption(e.target.value)}
                  className={`${styles.field} ${styles.select}`}
                  value={sortOption}
                >
                  <option value="Sort by" disabled>
                    Sort by
                  </option>
                  <option value="completed">Most completed tasks</option>
                  <option value="uncompleted">Least completed tasks</option>
                  <option value="latest">Latest</option>
                  <option value="amount">Most tasks</option>
                </select>
              </label>
            </div>
            <div className={styles.todos}>
              {lists
                .filter(handleSearchLists)
                .sort(handleSortLists)
                .map(({ id, name, published_at, task }) => {
                  return (
                    <SingleList
                      id={id}
                      key={id}
                      name={name}
                      published_at={published_at}
                      task={task}
                      setOpenList={setOpenList}
                      openList={openList}
                    />
                  );
                })}
            </div>
            <div className={styles.containerNewTodo}>
              <button
                onClick={() => {
                  actions.getId(null, true);
                  if (!openList) setOpenList(true);
                }}
                className={styles.btn}
              ></button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
