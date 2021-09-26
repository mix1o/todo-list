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
  const [openCreateList, setOpenCreateList] = useState(false);

  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [sortOption, setSortOption] = useState('Sort by');

  const [lists, setLists] = useState([]);

  const getLists = () => {
    fetch(`${process.env.REACT_APP_API}/to-do-lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(res => res.json())
      .then(json => setLists(json));
  };

  const handleSearchLists = list => {
    return list.name.toLowerCase().includes(searchKeyWord.toLowerCase());
  };

  const handleSortLists = (firstElement, secondElement) => {
    switch (sortOption) {
      case 'completed':
        return;

      case 'uncompleted':
        return;
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
      <Header openCreateList={openCreateList} />
      {openCreateList && (
        <List refreshLists={getLists} setOpenCreateList={setOpenCreateList} />
      )}
      <section
        onClick={() => {
          if (openCreateList) setOpenCreateList(false);
        }}
        style={openCreateList ? { filter: 'blur(3px)' } : {}}
        className={styles.dashboard}
      >
        <div className={styles.main}>
          <div className={styles.header}>
            <label className={styles.label}>
              <input
                className={styles.field}
                placeholder="Search"
                type="text"
                value={searchKeyWord}
                onChange={e => setSearchKeyWord(e.target.value)}
              />
            </label>
            <label className={styles.labelSelect}>
              <select
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
                    setOpenCreateList={setOpenCreateList}
                    openCreateList={openCreateList}
                  />
                );
              })}
          </div>
          <div className={styles.containerNewTodo}>
            <button
              onClick={() => {
                actions.getId(null, true);
                if (!openCreateList) setOpenCreateList(true);
              }}
              className={styles.btn}
            ></button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
