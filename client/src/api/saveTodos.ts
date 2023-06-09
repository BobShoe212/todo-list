import { Todo } from "../components/TodoList";
import { API_URL } from "./config";

export default async function saveUserTodos(newTodos: Todo[], userId: string) {
  await fetch(`${API_URL}/todos/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      todos: newTodos,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).catch((e) => {
    console.log(e);
    localStorage.setItem(userId, JSON.stringify([...newTodos]));
  });
  localStorage.clear();
}

// save to localstorage on fetch().catch(save to localstorage)
