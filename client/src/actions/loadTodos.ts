export default function loadTodosFromLocalStorage() {
  //get the Todos from Local storage and return them as Todo[]
  try {
    const loadedTodos = localStorage.getItem("todos");
    if (loadedTodos) {
      return JSON.parse(loadedTodos);
    } else {
      return [];
    }
  } catch {
    return [];
  }
}
