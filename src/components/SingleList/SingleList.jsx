import styles from './SingleList.module.css';
import { useSweetState } from '../../store/sub';
import { countTasks, formatDate } from '../../functions/SingleList/formats';

const SingleList = ({ name, published_at, id, task, setOpenList }) => {
  const date = formatDate(published_at);
  const count = countTasks(task);

  const [, actions] = useSweetState();

  return (
    <div
      onClick={() => {
        actions.getId(id, false);
        setOpenList(true);
      }}
      className={styles.list}
      data-testid="list"
    >
      <h5 data-testid="name-of-list" className={styles.name}>
        {name}
      </h5>
      <p className={styles.listDate}>Created at: {date}</p>
      <p data-testid="count-list" className={styles.count}>
        {count}
      </p>
    </div>
  );
};

export default SingleList;
