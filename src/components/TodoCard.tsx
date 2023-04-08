import React from "react";
import { Todo } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrashCan, faCheck);

export default function TodoCard(props: {
  todo: Todo;
  checkTodo: (id: string) => void;
}) {
  return (
    <div className="todocard">
      <button
        className="todo"
        id={props.todo.task}
        onClick={() => {
          props.checkTodo(props.todo.task);
        }}
      >
        {props.todo.isChecked ? (
          <del>{props.todo.task}</del>
        ) : (
          <>{props.todo.task}</>
        )}
        <div className="checkbox">
          {props.todo.isChecked && <FontAwesomeIcon icon="check" />}
        </div>
      </button>
    </div>
  );
}
