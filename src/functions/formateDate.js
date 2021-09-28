export const formatDate = published_at => {
  const date = new Date(published_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${day}-${month}-${year}`;
};
