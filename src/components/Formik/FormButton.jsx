import styles from './FormButton.module.css';

const FormButton = ({ text }) => {
  return (
    <button type="submit" className={styles.btn}>
      {text}
    </button>
  );
};

export default FormButton;
