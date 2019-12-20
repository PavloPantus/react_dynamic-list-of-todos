import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <div className="todo-item">
    <h1>{todo.user.name}</h1>
    <p>
Email -
      {todo.user.email}
    </p>
    <h2>{todo.title}</h2>
    <p className={todo.completed ? 'completed' : 'not-completed'}>
      {!todo.completed && 'not'}
      {' '}
completed
    </p>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape(
    {
      userId: PropTypes.number,
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
    }
  ).isRequired,
};

export default TodoItem;