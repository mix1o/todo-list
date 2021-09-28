import { Formik, Form } from 'formik';
import FormButton from '../../components/Formik/FormButton';
import Field from '../../components/Formik/Field';
import styles from './Auth.module.css';
import { Link, useHistory } from 'react-router-dom';
import { validation } from '../../components/Formik/validationSignUp';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { registration } from '../../api/SignUp/registration';

const SignUp = () => {
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const history = useHistory();

  const createAccount = async values => {
    const data = await registration(values);

    if (data.statusCode === 400) {
      try {
        setStatus({
          type: 'invalid',
          message: data.message[0].messages[0].message,
        });
      } catch {
        setStatus({ type: 'invalid', message: 'Error' });
      }
    }

    if (data.jwt) {
      setStatus({
        type: 'valid',
        message: 'Your account has been created',
      });
      setTimeout(() => {
        history.push('/');
      }, 1500);
    }
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
            <h3 className={`${styles.formText} ${styles.upper}`}>
              Create an new account
            </h3>
            <Field
              name="username"
              type="text"
              id="username"
              placeholder="Username"
              key="username-field"
              data-testid="username"
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
