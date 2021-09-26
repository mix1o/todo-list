import styles from './FormButton.module.css';

const FormButton = ({ text }) => {
  return (
    <button data-testid="btn-auth" type="submit" className={styles.btn}>
      {text}
    </button>
  );
};

export default FormButton;
