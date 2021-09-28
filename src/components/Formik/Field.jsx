import styles from './Field.module.css';
import { useField } from 'formik';

const Field = ({ ...rest }) => {
  const [field, meta] = useField(rest);

  const error = meta.touched && meta.error ? meta.error : '';

  return (
    <div className={styles.container}>
      <input
        {...rest}
        {...field}
        className={styles.field}
        data-testid={rest['data-testid'] || 'input'}
      />
      <p data-testid="message-validation" className={styles.error}>
        {error}
      </p>
    </div>
  );
};

export default Field;
