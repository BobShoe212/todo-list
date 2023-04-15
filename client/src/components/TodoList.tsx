import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadTodosFromLocalStorage from "../actions/loadTodos";
import { useUser, UserButton } from "@clerk/clerk-react";

//interface for the todo items that will be stored
export interface Todo {
  task: string;
  isChecked: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage());
  const [newTodo, setNewTodo] = useState<string>("");

  const { user } = useUser();

  //on change of todo list, save the new list to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify([...todos]));
  }, [todos]);

  //add a todo item to the list given a string for the task
  const addTodo = (newTask: string) => {
    if (todos.find((t) => t.task === newTask) || newTask === "") {
      return;
    } else {
      let newTodo = {
        task: newTask,
        isChecked: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  //toggle checked on a todo on the list, given the task string to find it.
  const checkTodo = (checkTask: string) => {
    let newTodos = todos.slice();
    const checkIndex = todos.findIndex((t) => t.task === checkTask);
    newTodos[checkIndex].isChecked = !newTodos[checkIndex].isChecked;
    setTodos([...newTodos]);
  };

  const handleChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value === " "
      ? setNewTodo("")
      : setNewTodo(e.currentTarget.value);
  };

  const deleteChecked = () => {
    let newTodos = todos.slice();
    setTodos(newTodos.filter((todo) => !todo.isChecked));
  };

  return (
    <div className="App">
      <div className="navbar">
        <UserButton />
        {user ? <>Hello, {user.username}!</> : null}
      </div>
      <div className="title">To Do List</div>
      <div className="todoList">
        {todos.length === 0 && "Nothing to do!"}
        {todos.map((t) => (
          <TodoCard key={t.task} todo={t} checkTodo={checkTodo} />
        ))}
      </div>
      <div className="todoForm">
        <form
          className="todoInput"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(newTodo);
          }}
        >
          <input
            id="taskInput"
            value={newTodo}
            placeholder="Add a new task"
            onChange={handleChangeNewTodo}
          />
          <button>Add</button>
        </form>
        <button className="deleteTodo" onClick={deleteChecked}>
          Delete <FontAwesomeIcon icon="check" />
        </button>
      </div>
    </div>
  );
}

export default App;
