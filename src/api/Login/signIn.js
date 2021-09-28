export const signIn = async values => {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const json = await response.json();

  return json;
};
