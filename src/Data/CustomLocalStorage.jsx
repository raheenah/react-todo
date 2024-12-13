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

  static delete(key, id) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
    let todoIndex = todos.findIndex((item) => item.id === id);

    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      localStorage.setItem(key, JSON.stringify(todos));
    }
  }

  static update(key, updatedTodo) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    localStorage.setItem(key, JSON.stringify(newTodos));
  }

  // static fetchTodoDetail(key, todoToFetchIndex) {
  //    const todos = JSON.parse(localStorage.getItem(key)) || [];
  //    const todoToFetch = todos[todoToFetchIndex];

  //   if (todoToFetch !== -1) {

  //     const todoDetails = JSON.parse(localStorage.getItem(todoToFetch))
  //     console.log(todoDetails, "todoDetails")
  //     return todoDetails
  //   }
  //   else {
  //     console.log("Todo not found")
  //           return null;

  //   }

  // }

  static fetchTodoDetail(key, todoToFetchIndex) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
console.log(todos, "todos")
    if (
      todos.length === 0 ||
      todoToFetchIndex < 0 ||
      todoToFetchIndex >= todos.length
    ) {
            console.log(todo.length, "todoToFetchIndex");

      console.log("Invalid index or todo not found");
      return null;
    }
    else {
      const todoToFetch = todos[todoToFetchIndex]; 
      // const todoDetails = JSON.parse(localStorage.getItem(todoToFetchIndex)); 
      // console.log(todoToFetch, "todosssss")
      // console.log(todoDetails, "tododetailssgsgd")
      return todoToFetch
    // 
    }

    
   
  }
}
