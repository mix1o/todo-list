import { Link, useHistory } from 'react-router-dom';
import Field from '../../components/Formik/Field';
import FormButton from '../../components/Formik/FormButton';
import { Formik, Form } from 'formik';
import styles from '../SignUp/Auth.module.css';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { signIn } from '../../api/auth';

const Login = () => {
  const [, setCookie] = useCookies();
  const [message, setMessage] = useState('');
  const history = useHistory();

  const logIn = async values => {
    const data = await signIn(values);

    if (data.statusCode === 400) {
      try {
        setMessage(data.message[0].messages[0].message);
      } catch (e) {
        setMessage('Error');
      }
      return;
    }

    if (data.jwt) {
      setCookie('user', data.jwt);
      history.push('/dashboard');
      return;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Formik
          initialValues={{
            identifier: '',
            password: '',
          }}
          onSubmit={values => logIn(values)}
        >
          <Form className={styles.form}>
            <h3 className={styles.formText} data-testid="headline">
              Login
            </h3>
            <Field
              name="identifier"
              type="text"
              id="identifier"
              placeholder="Email or Username"
              key="identifier-field"
              data-testid="login-field"
            />

            <Field
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              key="password-field"
            />
            <p className={styles.error}>{message}</p>
            <FormButton text="Login" />
          </Form>
        </Formik>
        <div className={styles.action}>
          <span className={styles.text}>or</span>
          <Link className={styles.link} to="/registration">
            create an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
