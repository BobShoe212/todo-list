import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import TodoCard from './components/TodoCard';

//interface for the todo items that will be stored
export interface Todo {
  id: string;
  task: string;
  dateCreated: Date;
  isChecked: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
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
    const today = new Date();
    let newTodo = {
      id: uuid(),
      task: newTask,
      dateCreated: today,
      isChecked: false,
    };
    setTodos([...todos, newTodo]);
  };

  //todo add the ability to tick off todos on the list
  const checkTodo = (id: string) => {
    let newTodos = todos.slice();
    const checkIndex = newTodos.findIndex((t) => {
      t.id === id;
    });
    //TODO change the isCHecked boolean of newTodos[checkIndex]
    setTodos([...newTodos]);
  };

  //delete/edit a todo on the list given the id of it
  const deleteTodo = (id: string) => {
    let newTodos = todos.slice();
    const deleteIndex = newTodos.findIndex((t) => {
      t.id === id;
    });
    newTodos.splice(deleteIndex, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="title">To Do List</div>
      <div className="todoList">
        box for todo list
        {todos.map((t) => (
          <TodoCard
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            checkTodo={checkTodo}
          />
        ))}
      </div>
      <button
        onClick={() => {
          addTodo('test');
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
