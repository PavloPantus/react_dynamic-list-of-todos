import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = (
  { arrayOfTodos,
    setArrayOfTodos,
    setActiveFilter,
    activeFilter }
) => {
  const sortByTitle = (todos) => {
    const sorted = [...todos]
      .sort((todo1, todo2) => (
        todo1.title.localeCompare(todo2.title)
      ));

    if (activeFilter !== 'sortByTitle') {
      setActiveFilter('sortByTitle');

      return sorted;
    }
    setActiveFilter(' ');

    return sorted.reverse();
  };

  const sortByUserName = (todos) => {
    const sorted = [...todos]
      .sort((todo1, todo2) => todo1.user.name.localeCompare(todo2.user.name));

    if (activeFilter === 'sortByUserName') {
      setActiveFilter('');

      return sorted;
    }
    setActiveFilter('sortByUserName');

    return sorted.reverse();
  };

  const sortByStatus = (todos) => {
    const sorted = [...todos]
      .filter(todo => todo.completed)
      .concat(todos.filter(todo => !todo.completed));

    if (activeFilter === 'sortByStatus') {
      setActiveFilter('');

      return sorted;
    }
    setActiveFilter('sortByStatus');

    return sorted.reverse();
  };

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
  setActiveFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default TodoList;
