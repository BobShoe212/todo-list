import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchUserTodos from "../api/loadTodos";
import { useUser, UserButton } from "@clerk/clerk-react";
import saveUserTodos from "../api/saveTodos";

//interface for the todo items that will be stored
export interface Todo {
  task: string;
  isChecked: boolean;
}

export interface UserType {
  uid: String;
  todos: [Todo];
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isOnline, setIsOnline] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();

  //on change of isSignedIn, load the todo list from local storage
  useEffect(() => {
    async function fetchTodos() {
      if (isLoaded && isSignedIn && !!user) {
        //check if there is anything in local storage. add those to the list, needs to then delete the local storage.
        const localData = JSON.parse(localStorage.getItem(user.id)!);
        localStorage.clear();

        const userData = await fetchUserTodos(user.id).catch((e) => {
          console.log(e);
          setIsOnline(false);
          setTodos([...localData]);
        });

        //add any todos from the local storage to the list
        !!localData ? setTodos(localData) : setTodos(userData);
        //todo Try to compare userData and localData and return a combined list.

        setIsOnline(true);
      }
    }
    fetchTodos();
  }, [isSignedIn]);

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
      saveUserTodos([...todos, newTodo], user!.id).catch((e) => {
        console.log(e);
        setIsOnline(false);
      });
      setIsOnline(true);
    }
  };

  //toggle checked on a todo on the list, given the task string to find it.
  const checkTodo = (checkTask: string) => {
    let newTodos = todos.slice();
    const checkIndex = todos.findIndex((t) => t.task === checkTask);
    newTodos[checkIndex].isChecked = !newTodos[checkIndex].isChecked;
    setTodos([...newTodos]);
    saveUserTodos([...newTodos], user!.id).catch((e) => {
      console.log(e);
      setIsOnline(false);
    });
    setIsOnline(true);
  };

  const handleChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value === " "
      ? setNewTodo("")
      : setNewTodo(e.currentTarget.value);
  };

  const deleteChecked = () => {
    let newTodos = todos.slice();
    let filteredTodos = newTodos.filter((todo) => !todo.isChecked);
    setTodos([...filteredTodos]);
    saveUserTodos([...filteredTodos], user!.id).catch((e) => {
      console.log(e);
      setIsOnline(false);
    });
    setIsOnline(true);
  };

  return (
    <div className="App">
      <div className="navbar">
        <UserButton />
        {user ? <>Hello, {user.firstName}!</> : null}
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
