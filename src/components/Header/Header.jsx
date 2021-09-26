import { useCookies } from 'react-cookie';
import styles from './Header.module.css';

const Header = () => {
  const [cookies, , removeCookie] = useCookies();

  const { user } = cookies;
  const logOut = () => {
    removeCookie('user');
  };

  return (
    <header className={styles.header}>
      <div>
        <h2 className={styles.name}>ToDo-List</h2>
      </div>
      {user && (
        <div>
          <button onClick={logOut} className={styles.button}>
            <i className={`fas fa-sign-out-alt ${styles.icon}`}></i>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
