import styles from './SingleList.module.css';
import { useSweetState } from '../../../../store/sub';

const SingleList = ({ name, published_at, id, task, setOpenCreateList }) => {
  const formatDate = () => {
    const date = new Date(published_at);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${day}-${month}-${year}`;
  };

  const countTasks = () => {
    const completed = task.filter(task => task.isDone === true);
    const unCompleted = task.filter(task => task.isDone === false);

    return `Completed: ${completed.length} Uncompleted: ${unCompleted.length} All: ${task.length}`;
  };

  const [, actions] = useSweetState();

  return (
    <div
      onClick={() => {
        actions.getId(id, false);
        setOpenCreateList(true);
      }}
      className={styles.list}
    >
      <h5 className={styles.name}>{name}</h5>
      <p className={styles.listDate}>Created at: {formatDate()}</p>
      <p className={styles.count}>{countTasks()}</p>
    </div>
  );
};

export default SingleList;
