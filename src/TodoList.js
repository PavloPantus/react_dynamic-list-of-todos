import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ arrayOfTodos, setArrayOfTodos }) => {
  const sortByTitle = todos => [...todos]
    .sort((todo1, todo2) => todo1.title.localeCompare(todo2.title));

  const sortByUserName = todos => [...todos]
    .sort((todo1, todo2) => todo1.user.name.localeCompare(todo2.user.name));

  const sortByStatus = todos => [...todos]
    .filter(todo => todo.completed)
    .concat(todos.filter(todo => !todo.completed));

  return (
    <>

      <button
        onClick={() => {
          setArrayOfTodos(sortByTitle(arrayOfTodos));
        }}
        className="button_sort"
        type="button"
      >
         sort by title
      </button>

      <button
        onClick={() => {
          setArrayOfTodos(sortByUserName(arrayOfTodos));
        }}
        className="button_sort"
        type="button"
      >
        sort by user name
      </button>

      <button
        onClick={() => {
          setArrayOfTodos(sortByStatus(arrayOfTodos));
        }}
        className="button_sort"
        type="button"
      >
        sort by status
      </button>

      <div className="todo-list">
        {
          arrayOfTodos.map(
            todo => <TodoItem key={todo.id} todo={todo} />
          )
        }
      </div>
    </>
  );
};

TodoList.propTypes = {
  arrayOfTodos: PropTypes.arrayOf(
    PropTypes.shape({

      userId: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.shape({
          street: PropTypes.string,
          suite: PropTypes.string,
          city: PropTypes.string,
          zipcode: PropTypes.string,
          geo: PropTypes.shape({
            lat: PropTypes.string,
            lng: PropTypes.string,
          }),
        }),
      }),

    }),
  ).isRequired,
  setArrayOfTodos: PropTypes.func.isRequired,
};

export default TodoList;
