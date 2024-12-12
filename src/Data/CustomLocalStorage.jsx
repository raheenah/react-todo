export default class CustomLocalStorage {
  static get(key) {
    let res = JSON.parse(localStorage.getItem(key));

    if (res != null) return res;
    return [];
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }

  static update(key, updatedTodo) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    localStorage.setItem(key, JSON.stringify(newTodos));
  }
}
