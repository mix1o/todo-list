import { Link, useHistory } from 'react-router-dom';
import Field from '../Formik/Field';
import FormButton from '../Formik/FormButton';
import { Formik, Form } from 'formik';
import styles from './Auth.module.css';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Header from '../Header/Header';

const Login = () => {
  const [, setCookie] = useCookies();
  const [message, setMessage] = useState('');
  const history = useHistory();

  const signIn = values => {
    fetch(`${process.env.REACT_APP_API}/auth/local`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.statusCode === 400) {
          setMessage(json.message[0].messages[0].message);
        }

        if (json.jwt) {
          setCookie('user', json, { path: '/' });
          history.push('/dashboard');
        }
      });
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
          onSubmit={values => signIn(values)}
        >
          <Form className={styles.form}>
            <h3 className={styles.formText}>Login</h3>
            <Field
              name="identifier"
              type="text"
              id="identifier"
              placeholder="Email or Username"
              key="identifier-field"
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
