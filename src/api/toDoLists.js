export const allUserLists = async user => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/to-do-lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
    });

    const json = await response.json();
    return { json, correct: true };
  } catch {
    return { correct: false };
  }
};

export const getSingleList = async (user, id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/to-do-lists/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
    }
  );

  const json = await response.json();
  return json;
};

export const createNewList = async (user, list) => {
  await fetch(`${process.env.REACT_APP_API}/to-do-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(list),
  });
};

export const updateList = async (user, list, id) => {
  await fetch(`${process.env.REACT_APP_API}/to-do-lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
    body: JSON.stringify(list),
  });
};

export const deleteList = async (user, id) => {
  await fetch(`${process.env.REACT_APP_API}/to-do-lists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
  });
};
