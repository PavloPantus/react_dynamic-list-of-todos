import React, { useState } from 'react';
import './App.scss';

import todosApi from './api/todos';
import usersApi from './api/users';

import TodoList from './TodoList';

function App() {
  const [arrayOfTodos, setArrayOfTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoadStatus] = useState(false);
  const [activeFilter, setActiveFilter] = useState(' ');

  const loadTodosWithUsers = async() => {
    setLoading(true);

    const getDataFromApi = async(api) => {
      const dataPromise = await fetch(api);

      return dataPromise.json();
    };
    const [arrayOfTodosFromServer, arrayOfUsers] = await Promise.all(
      [getDataFromApi(todosApi), getDataFromApi(usersApi)]
    );

    const todosWithUsersFromServer = arrayOfTodosFromServer.map(
      todo => ({
        ...todo,
        user: arrayOfUsers.find(
          user => user.id === todo.userId
        ),
      })
    );

    setArrayOfTodos(todosWithUsersFromServer);
    setLoading(false);
    setLoadStatus(true);
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>

      {!loaded
      && (
        <button
          className={loading ? 'button__loading' : 'button__load'}
          type="button"
          onClick={loadTodosWithUsers}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load'}
        </button>
      )
      }
      {
        loaded
        && (
          <TodoList
            setArrayOfTodos={setArrayOfTodos}
            arrayOfTodos={arrayOfTodos}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        )
      }

    </div>
  );
}

export default App;
