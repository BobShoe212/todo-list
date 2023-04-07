import React from "react";
import { Todo } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrashCan, faCheck);

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
      >
        {props.todo.isChecked && <FontAwesomeIcon icon="check" />}
      </button>
      <div className="todocard-info">
        <h3>{props.todo.task}</h3>
      </div>
      <div className="todocard-buttons">
        <button
          className="deleteTodo"
          onClick={() => {
            props.deleteTodo(props.todo.task);
          }}
        >
          {" "}
          <FontAwesomeIcon icon="trash-can" />
        </button>
      </div>
    </div>
  );
}
