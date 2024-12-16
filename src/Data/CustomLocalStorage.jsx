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
      console.log("deleting...");

    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      localStorage.setItem(key, JSON.stringify(todos));
      console.log("todo has been deleted")
    }
  }

  static update(key, updatedTodo) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    localStorage.setItem(key, JSON.stringify(newTodos));
  }

  static changeStatus(key, updatedTodo) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
    // console.log("updating stat")
        const updatedTodos = todos.map((todo) => {
          if (todo.id === updatedTodo) {
            // console.log("Found todo to update:", todo);
            const updatingTodo = { ...todo, completed: !todo.completed }; 

            // console.log("new status", updatingTodo.completed);
            // console.log("updatedtodo", updatingTodo)
            return updatingTodo;
          }
          return todo; 
        });
    
    // console.log(updatedTodos, "updatedtodos")
       localStorage.setItem(key, JSON.stringify(updatedTodos));
      //  console.log("Updated todos saved to localStorage:", updatedTodos);
  }

  static fetchTodoDetail(key, todoToFetchIndex) {
    const todos = JSON.parse(localStorage.getItem(key)) || [];
// console.log(todos, "todos")
    if (
      
      todoToFetchIndex < 0    ) {
            // console.log(todo.length, "todoToFetchIndex");

      console.log("Invalid index or todo not found");
      return null;
    }
    else {
      const todoToFetch = todos.find((todo) => todo.id === todoToFetchIndex);
      // const todoDetails = JSON.parse(localStorage.getItem(todoToFetchIndex)); 
      // console.log(todoToFetch, "todosssss")
      // console.log(todoDetails, "tododetailssgsgd")
      return todoToFetch
    // 
    }

    
   
  }


}
