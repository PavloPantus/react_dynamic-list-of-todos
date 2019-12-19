import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import TodoList from './TodoList';

function App() {
  const [arrayOfTodos, setArrayOfTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoadStatus] = useState(false);

  const loadTodosWithUsers = () => {
    setLoading(true);

    todos()
      .then(
        (todosFromServer) => {
          users().then(
            (myUsers) => {
              const todosWithUsersFromServer = todosFromServer.map(
                todo => ({
                  ...todo,
                  user: myUsers.find(user => user.id === todo.userId),
                })
              );

              setArrayOfTodos(todosWithUsersFromServer);
              setLoading(false);
              setLoadStatus(true);
            }
          );
        }
      );
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
          />
        )
      }

    </div>
  );
}

export default App;
