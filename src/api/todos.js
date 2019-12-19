const todos = async() => {
  // eslint-disable-next-line
  const dataPromise = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await dataPromise.json();

  return data;
};

export default todos;
