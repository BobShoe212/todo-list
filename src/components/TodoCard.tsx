import React from 'react';
import { Todo } from '../App';

export default function TodoCard(props: {
  todo: Todo;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string) => void;
}) {
  const handleDelete = () => {
    props.deleteTodo(props.todo.id);
  };

  const handleCheck = () => {
    props.checkTodo(props.todo.id);
  };

  return (
    <div className="todocard">
      <button
        className={props.todo.isChecked ? 'checked' : 'unchecked'}
        onClick={handleCheck}
      >
        {props.todo.isChecked ? 'true' : 'false'}
      </button>
      <div className="todocard-info">
        <h2>{props.todo.task}</h2>
        <span>
          {props.todo.dateCreated.getDate()}-{props.todo.dateCreated.getMonth()}
          -{props.todo.dateCreated.getFullYear()}
        </span>
      </div>
      <div className="todocard-buttons">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
