import { Formik, Form } from 'formik';
import FormButton from '../Formik/FormButton';
import Field from '../Formik/Field';
import styles from './Auth.module.css';
import { Link, useHistory } from 'react-router-dom';
import { validation } from '../Formik/validationSignUp';
import { useState } from 'react';
import Header from '../Header/Header';

const SignUp = () => {
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  console.log(process.env.REACT_APP_API);
  const history = useHistory();

  const createAccount = values => {
    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    fetch(`${process.env.REACT_APP_API}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 400) {
          setStatus({
            type: 'invalid',
            message: json.message[0].messages[0].message,
          });
        }

        if (json.jwt) {
          setStatus({
            type: 'valid',
            message: 'Your account has been created',
          });
          setTimeout(() => {
            history.push('/');
          }, 1500);
        }
      });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link to="/">
          <i className={`fas fa-long-arrow-alt-left fa-3x ${styles.icon}`}></i>
        </Link>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
          }}
          validationSchema={validation}
          onSubmit={values => createAccount(values)}
        >
          <Form className={styles.form}>
            <h3 className={styles.formText}>Create an new account</h3>
            <Field
              name="username"
              type="text"
              id="username"
              placeholder="Username"
              key="username-field"
            />
            <Field
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              key="email-field"
            />
            <Field
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              key="password-field"
            />
            <Field
              name="repeatPassword"
              type="password"
              id="repeat-password"
              placeholder="Repeat password"
              key="repeat-password-field"
            />
            <FormButton text="Create" />
            <p
              className={
                status.type === 'invalid'
                  ? `${styles.error}`
                  : `${styles.success}`
              }
            >
              {status.message}
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
