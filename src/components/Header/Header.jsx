import { useCookies } from 'react-cookie';
import styles from './Header.module.css';

const Header = ({ openCreateList }) => {
  const [, , removeCookie] = useCookies();

  const logOut = () => {
    removeCookie('user');
  };

  return (
    <header
      style={openCreateList ? { filter: 'blur(5px)' } : {}}
      className={styles.header}
    >
      <div>
        <h2 className={styles.name}>ToDo-List</h2>
      </div>
      <div>
        <button onClick={logOut} className={styles.button}>
          <i className={`fas fa-sign-out-alt ${styles.icon}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
