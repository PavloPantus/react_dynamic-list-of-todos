import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = (
  { arrayOfTodos,
    setArrayOfTodos,
    setActiveSort,
    activeSort }
) => {
  const sortTableBy = (column, typeOfSortedItems) => {
    const getSortMethod = (newColumn, newTypeOfSortedItems) => {
      const getDataByRoute = (obj, str) => {
        const route = str.split('.')
          .reduce((objValue, partOfRoute) => objValue[partOfRoute], obj);

        return route;
      };

      if (newTypeOfSortedItems === 'string') {
        return (a, b) => getDataByRoute(a, newColumn)
          .localeCompare(getDataByRoute(b, newColumn));
      }

      if (newTypeOfSortedItems === 'boolean'
        || newTypeOfSortedItems === 'number') {
        return (a, b) => (
          getDataByRoute(a, newColumn) - getDataByRoute(b, newColumn)
        );
      }

      return undefined;
    };

    const sorted = [...arrayOfTodos]
      .sort(getSortMethod(column, typeOfSortedItems));

    if (activeSort !== column) {
      setActiveSort(column);

      return sorted;
    }
    setActiveSort(' ');

    return sorted.reverse();
  };

  return (
    <>
      <button
        onClick={() => {
          setArrayOfTodos(sortTableBy('title', 'string'));
        }}
        className="button_sort"
        type="button"
      >
         sort by title
      </button>

      <button
        onClick={() => {
          setArrayOfTodos(sortTableBy('user.name', 'string'));
        }}
        className="button_sort"
        type="button"
      >
        sort by user name
      </button>

      <button
        onClick={() => {
          setArrayOfTodos(sortTableBy('completed', 'boolean'));
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

      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,

        email: PropTypes.string,

      }),

    }),
  ).isRequired,
  setArrayOfTodos: PropTypes.func.isRequired,
  setActiveSort: PropTypes.func.isRequired,
  activeSort: PropTypes.string.isRequired,
};

export default TodoList;
