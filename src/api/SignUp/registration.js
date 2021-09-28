export const registration = async values => {
  const user = {
    username: values.username,
    email: values.email,
    password: values.password,
  };

  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/local/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );

  const json = await response.json();
  return json;
};
