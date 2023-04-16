import { API_URL } from "./config";

export default async function fetchUserTodos(uid: string) {
  return fetch(`${API_URL}/todos/${uid}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((jsonres) => jsonres.todos)
    .catch((err) => console.log(err));
}
