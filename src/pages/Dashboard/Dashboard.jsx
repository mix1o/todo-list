import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Header from '../../components/Header/Header';
import styles from './Dashboard.module.css';
import SingleList from '../../components/SingleList/SingleList';
import List from '../../components/List/List';
import { allUserLists } from '../../api/toDoLists';
import { filterByStatus } from '../../functions/filterByStatus';
import { useParams, useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const { id } = useParams();

  const [openList, setOpenList] = useState();

  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [sortOption, setSortOption] = useState('Sort by');

  const [lists, setLists] = useState([]);

  const [hasError, setHasError] = useState(false);

  const getLists = useCallback(async () => {
    const data = await allUserLists(user);
    if (data.correct) {
      setLists(data.json);
      return;
    }

    setHasError(true);
  }, [user]);

  const handleSearchLists = list => {
    return list.name.toLowerCase().includes(searchKeyWord.toLowerCase());
  };

  const handleSortLists = (firstElement, secondElement) => {
    switch (sortOption) {
      case 'completed':
        const completedMost = filterByStatus(firstElement, secondElement);
        return (
          completedMost.secondCompleted.length -
          completedMost.firstCompleted.length
        );

      case 'uncompleted':
        const completedLeast = filterByStatus(firstElement, secondElement);
        return (
          completedLeast.firstCompleted.length -
          completedLeast.secondCompleted.length
        );

      case 'latest':
        return new Date(firstElement.published_at) >
          new Date(secondElement.published_at)
          ? -1
          : 1;
      case 'amount':
        return secondElement.task.length - firstElement.task.length;

      default:
        return;
    }
  };

  const history = useHistory();

  useEffect(() => {
    getLists();
  }, [getLists]);

  useEffect(() => {
    if (id) setOpenList(true);
  }, [id]);

  return (
    <>
      {openList && (
        <List refreshLists={getLists} setOpenList={setOpenList} id={id} />
      )}
      {!hasError && (
        <section
          onClick={() => {
            if (openList) {
              setOpenList(false);
              history.push('/dashboard');
            }
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
                    />
                  );
                })}
            </div>
            <div className={styles.containerNewTodo}>
              <button
                onClick={() => {
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
