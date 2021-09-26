import styles from './Field.module.css';
import { useField } from 'formik';
import { useState } from 'react';

const Field = ({ ...rest }) => {
  const [field, meta] = useField(rest);

  const error = meta.touched && meta.error ? meta.error : '';
  const [focus, setFocus] = useState(false);

  return (
    <label
      onFocus={() => setFocus(!focus)}
      onBlur={() => setFocus(!focus)}
      className={styles.label}
    >
      <input
        {...rest}
        {...field}
        className={styles.field}
        data-testid="input"
      />
      <p data-testid="message-validation" className={styles.error}>
        {error}
      </p>
    </label>
  );
};

export default Field;
