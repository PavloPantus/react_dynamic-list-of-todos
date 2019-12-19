const users = async() => {
  const dataPromise = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await dataPromise.json();

  return data;
};

export default users;
