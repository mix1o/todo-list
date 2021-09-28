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
