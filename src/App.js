import React, { useState } from 'react';
import './App.scss';

import todosURL from './api/todos';
import usersURL from './api/users';

import TodoList from './TodoList';
import GetDataFromApi from './api/GetDataFromApi';

function App() {
  const [arrayOfTodos, setArrayOfTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoadStatus] = useState(false);
  const [activeFilter, setActiveFilter] = useState(' ');

  const loadTodosWithUsers = async() => {
    setLoading(true);

    const [arrayOfTodosFromServer, arrayOfUsers] = await Promise.all(
      [GetDataFromApi(todosURL), GetDataFromApi(usersURL)]
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
