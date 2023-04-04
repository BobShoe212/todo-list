import React from "react";
import { Todo } from "../App";

export default function TodoCard(props: {
  todo: Todo;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string) => void;
}) {
  return (
    <div className="todocard">
      <button
        onClick={() => {
          props.checkTodo(props.todo.task);
        }}
        className={props.todo.isChecked ? "checked" : "unchecked"}
      ></button>
      <div className="todocard-info">
        <h3>{props.todo.task}</h3>
      </div>
      <div className="todocard-buttons">
        <button
          onClick={() => {
            props.deleteTodo(props.todo.task);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
