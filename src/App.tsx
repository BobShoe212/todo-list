import { useState, useEffect } from "react";
import "./App.css";
import TodoCard from "./components/TodoCard";

//interface for the todo items that will be stored
export interface Todo {
  task: string;
  dateCreated: Date;
  isChecked: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  //state for current todos, TODO use localstorage to store the list

  //on load, gets the todos from local storage
  /*useEffect(() => {
    setTodos(getTodos());
  }, []);

  //on change of todo list, save the new list to local storage
  /*useEffect(() => {
    //TODO save the todo list to local storage
  }, [todos]);*/

  const getTodos = () => {
    //get the Todos from Local storage and return them as Todo[]

    return [];
  };

  //add a todo item to the list given a string for the task
  const addTodo = (newTask: string) => {
    if (todos.find((t) => t.task === newTask)) {
      return;
    } else {
      const today = new Date();
      let newTodo = {
        task: newTask,
        dateCreated: today,
        isChecked: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  //toggle checked on a todo on the list, given the task string to find it.
  const checkTodo = (checkTask: string) => {
    let newTodos = todos.slice();
    const checkIndex = todos.findIndex((t) => t.task === checkTask);
    newTodos[checkIndex].isChecked = !newTodos[checkIndex].isChecked;
    setTodos([...newTodos]);
  };

  //delete a todo on the list given the id of it
  const deleteTodo = (deleteTask: string) => {
    let newTodos = todos.slice();
    const deleteIndex = newTodos.findIndex((t) => t.task === deleteTask);
    newTodos.splice(deleteIndex, 1);
    setTodos(newTodos);
  };

  const handleChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.currentTarget.value);
  };

  return (
    <div className="App">
      <div className="title">To Do List</div>
      <div className="todoList">
        {todos.length === 0 && "Nothing to do!"}
        {todos.map((t) => (
          <TodoCard
            key={t.task}
            todo={t}
            deleteTodo={deleteTodo}
            checkTodo={checkTodo}
          />
        ))}
      </div>
      <div>
        <input id="taskInput" value={newTodo} onChange={handleChangeNewTodo} />
        <button
          onClick={() => {
            addTodo(newTodo);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
