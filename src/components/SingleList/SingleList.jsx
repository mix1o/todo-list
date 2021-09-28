import styles from './SingleList.module.css';
import { countTasks } from '../../functions/countTasks';
import { formatDate } from '../../functions/formateDate';
import { Link } from 'react-router-dom';

const SingleList = ({ name, published_at, id, task }) => {
  const date = formatDate(published_at);
  const count = countTasks(task);

  return (
    <Link to={`/dashboard/${id}`} className={styles.list} data-testid="list">
      <h5 data-testid="name-of-list" className={styles.name}>
        {name}
      </h5>
      <p className={styles.listDate}>Created at: {date}</p>
      <p data-testid="count-list" className={styles.count}>
        {count}
      </p>
    </Link>
  );
};

export default SingleList;
