import { useState, useEffect, useCallback } from "react";
import CustomLocalStorage from "../Data/CustomLocalStorage";
// import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
const TodosList = () => {
  const [todos, setTodos] = useState(CustomLocalStorage.get("todos") || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prevButtonStyle, setPrevButtonStyle] = useState({});
  const [nextButtonStyle, setNextButtonStyle] = useState({});
  const [lastPageButtonStyle, setlastPageButtonStyle] = useState({});
  const [firstPageButtonStyle, setfirstPageButtonStyle] = useState({});
  const [paginatedList, setPaginatedList] = useState([]);
  const [status, setStatus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterUser, setFilterUser] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    completed: false,
  });
  

  const todosPerPage = 12;
  const fetchTodos = useCallback(async () => {
    try {
      let localTodos = CustomLocalStorage.get("todos");
      // console.log(localTodos, "localTodos");
      if (localTodos.length > 0) {
        setTodos(CustomLocalStorage.get("todos"));
        setTotalPages(Math.ceil(localTodos.length / todosPerPage));
        setLoading(false);
        // console.log(localTodos);
      } else {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTodos(data);

        CustomLocalStorage.set("todos", data);
        localStorage.getItem("todos");
        setTotalPages(Math.ceil(data.length / todosPerPage));
        setLoading(false);
        // console.log(response);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // const getFilteredTodos =  () => {
  //   const filteredTodos_ = todos.filter((todo) => {
  //     const matchesSearch = todo.title
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());

  //     const matchesFilter =
  //       filterStatus === "all" ||
  //       (filterStatus === "completed" && todo.completed) ||
  //       // (filterStatus === "user" && todo.user) ||
  //       (filterStatus === "notCompleted" && !todo.completed);

  //     const userFilter =
  //       filterUser === "all" ||
  //       (filterUser === "user1" && todo.userId === 1) ||
  //       (filterUser === "user2" && todo.userId === 2) ||
  //       (filterUser === "user3" && todo.userId === 3) ||
  //       (filterUser === "user4" && todo.userId === 4) ||
  //       (filterUser === "user5" && todo.userId === 5) ||
  //       (filterUser === "user6" && todo.userId === 6) ||
  //       (filterUser === "user7" && todo.userId === 7) ||
  //       (filterUser === "user8" && todo.userId === 8) ||
  //       (filterUser === "user9" && todo.userId === 9) ||
  //       (filterUser === "user10" && todo.userId === 10);

  //     const filteredAndSearchedTodos =
  //       matchesSearch && matchesFilter && userFilter;

  //     return filteredAndSearchedTodos;
  //   });

  //   const startIndex = (currentPage - 1) * todosPerPage;
  //   const endIndex = startIndex + todosPerPage;
  //   setPaginatedList(filteredTodos_.slice(startIndex, endIndex));
  //   return filteredTodos_;
  // };


const getFilteredTodos = useCallback(() => {
  const filteredTodos_ = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.completed) ||
      (filterStatus === "notCompleted" && !todo.completed);

    const userFilter =
      filterUser === "all" ||
      (filterUser === "user1" && todo.userId === 1) ||
      (filterUser === "user2" && todo.userId === 2) ||
      (filterUser === "user3" && todo.userId === 3) ||
      (filterUser === "user4" && todo.userId === 4) ||
      (filterUser === "user5" && todo.userId === 5) ||
      (filterUser === "user6" && todo.userId === 6) ||
      (filterUser === "user7" && todo.userId === 7) ||
      (filterUser === "user8" && todo.userId === 8) ||
      (filterUser === "user9" && todo.userId === 9) ||
      (filterUser === "user10" && todo.userId === 10);

    return matchesSearch && matchesFilter && userFilter;
  });

  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;

  setPaginatedList(filteredTodos_.slice(startIndex, endIndex));


  const pages = Math.ceil(filteredTodos_.length / todosPerPage);
  setTotalPages(pages);

  return filteredTodos_;
}, [todos, currentPage, searchQuery, filterStatus, filterUser]);

useEffect(() => {
  getFilteredTodos();
}, [todos, currentPage, searchQuery, filterStatus, filterUser]);

useEffect(() => {

  setCurrentPage(1);
}, [searchQuery, filterStatus, filterUser]);
  const getPaginatedTodos = useCallback(() => {
    const filteredTodos = getFilteredTodos();
    const startIndex = (currentPage - 1) * todosPerPage;
    const endIndex = startIndex + todosPerPage;
    setPaginatedList(filteredTodos.slice(startIndex, endIndex));
  }, [todos, currentPage, searchQuery, filterStatus, filterUser]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleFadePrevButton = () => {
    if (currentPage === 1) {
      setPrevButtonStyle({
        backgroundColor: "#F8D1D9",
        color: "#A88CA9",
        cursor: "not-allowed",
      });
      setfirstPageButtonStyle({
        backgroundColor: "#F8D1D9",
        color: "#A88CA9",
        cursor: "not-allowed",
      });
    } else {
      setPrevButtonStyle({});
      setfirstPageButtonStyle({});
    }
  };

  useEffect(() => {
    handleFadePrevButton();
  }, [currentPage, totalPages]);

  const handleFadeNextButton = () => {
    if (currentPage === totalPages) {
      setNextButtonStyle(
      {
        backgroundColor: "#F8D1D9",
        color: "#A88CA9",
        cursor: "not-allowed",
      });
      setlastPageButtonStyle({
        backgroundColor: "#F8D1D9",
        color: "#A88CA9",
        cursor: "not-allowed",
      });
    } else {
      setNextButtonStyle({});
      setlastPageButtonStyle({});
    }
  };

  useEffect(() => {
    handleFadeNextButton();
  }, [currentPage, totalPages]);

  useEffect(() => {
    getPaginatedTodos();
  }, [todos, currentPage, searchQuery, filterStatus, filterUser, status]);

  const handleAddNewActivity = () => {
    if (!newActivity.title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    const isDuplicate = todos.some(
      (todo) =>
        todo.title.toLowerCase() === newActivity.title.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("An activity with this title already exists.");
      return;
    }

    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;

    setTodos([...todos, { id: newId, ...newActivity }]);
    CustomLocalStorage.set("todos", [...todos, { id: newId, ...newActivity }]);

    setShowModal(false);
    document.body.style.overflow = "auto";
    setNewActivity({ title: "", completed: false });
  };
  const handleCompleteActivity = (id) => {
    // console.log("completed", id);
  setStatus((prevStatus) => !prevStatus);

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // console.log("Found todo to update:", todo);
        const updatingTodo = { ...todo, completed: !todo.completed };

        // console.log("new status", updatingTodo.completed);
        // console.log("updatedtodo", updatingTodo);
        return updatingTodo;
      }
      return todo;
    });
    // setTodos(updatedTodos);
    CustomLocalStorage.changeStatus("todos", id);
    const updatedList = JSON.parse(localStorage.getItem("todos")) || [];

    setTodos(updatedList);
    // console.log(todos, "updatedlistoftodos")

  };

  // const handleDelete = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  //   CustomLocalStorage.delete("todos", id);
  // };

  // const startEditing = (todo) => {
  //   setEditingTodoId(todo.id);
  //   setEditedUser(todo.userId);
  //   setEditedTitle(todo.title);
  //   setEditedStatus(todo.completed);
  // };

  // const saveChanges = (id) => {
  //   if (!editedTitle.trim()) {
  //     alert("Title cannot be empty.");
  //     return;
  //   }

  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             title: editedTitle,
  //             completed: editedStatus,
  //             userId: editedUser,
  //             id: id,
  //           }
  //         : todo
  //     )
  //   );

  //   CustomLocalStorage.update("todos", {
  //     title: editedTitle,
  //     completed: editedStatus,
  //     userId: editedUser,
  //     id: id,
  //   });

  //   setEditingTodoId(null);
  // };

  

  // const cancelEditing = () => {
  //   setEditingTodoId(null);
  //   setEditedTitle("");
  //   setEditedStatus(false);
  // };

  return (
    <div className='flex flex-col justify-center mx-auto w-full lg:max-w-[80%] items-center gap-8'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='flex items-center  w-full  gap-2'>
            <button
              role='button'
              aria-label='Add new activity'
              onClick={() => {
                setShowModal(true);
                document.body.style.overflow = "hidden";
              }}
              className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
            >
              <i className='fa-solid fa-plus'></i>
            </button>

            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border border-border  placeholder:text-text-primary placeholder:font-semibold w-full px-2 sm:px-4 py-2 rounded-lg bg-transparent focus:outline-none focus:shadow-custom-focus hover:shadow-custom-focus'
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='flex items-center justify-center bg-button-bg text-center focus:outline-none hover:bg-button-hover text-text-primary font-bold p-1 appearance-none w-fit py-2 rounded-lg'
            >
              <option value='all' className='bg-accent' defaultValue>
                Status
              </option>
              <option value='completed'>Done</option>
              <option value='notCompleted'>Not Done</option>
            </select>

            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className='bg-button-bg text-center focus:outline-none hover:bg-button-hover text-text-primary font-bold  appearance-none w-fit py-2 rounded-lg'
            >
              <option value='all' className='bg-accent' defaultValue>
                User{" "}
              </option>
              <option value='user1'>User 1</option>
              <option value='user2'>User 2</option>
              <option value='user3'>User 3</option>
              <option value='user4'>User 4</option>
              <option value='user5'>User 5</option>
              <option value='user6'>User 6</option>
              <option value='user7'>User 7</option>
              <option value='user8'>User 8</option>
              <option value='user9'>User 9</option>
              <option value='user10'>User 10</option>
            </select>
          </div>

          {showModal && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
              <div className='bg-background p-6 rounded-lg shadow-lg flex flex-col gap-4'>
                <h2 className='text-lg font-bold '>Add New Activity</h2>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold'>User</label>
                  <select
                    value={newActivity.userId || "all"}
                    onChange={(e) =>
                      setNewActivity((prevActivity) => ({
                        ...prevActivity,
                        userId:
                          e.target.value === "all"
                            ? ""
                            : parseInt(e.target.value),
                      }))
                    }
                    className='border appearance-none focus:outline-none focus:shadow-custom-focus bg-transparent placeholder:text-text-primary border-border px-4 py-2 w-full rounded-lg'
                  >
                    {" "}
                    <option
                      value='all'
                      className='bg-accent'
                      disabled
                      defaultValue
                    >
                      Select User
                    </option>
                    <option value='1'>User 1</option>
                    <option value='2'>User 2</option>
                    <option value='3'>User 3</option>
                    <option value='4'>User 4</option>
                    <option value='5'>User 5</option>
                    <option value='6'>User 6</option>
                    <option value='7'>User 7</option>
                    <option value='8'>User 8</option>
                    <option value='9'>User 9</option>
                    <option value='10'>User 10</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='  font-semibold'>Title</label>
                  <textarea
                    type='text'
                    value={newActivity.title}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, title: e.target.value })
                    }
                    className='min-h-24 focus:outline-none focus:shadow-custom-focus border bg-transparent placeholder:text-text-primary border-border px-4 py-2 w-full rounded-lg'
                    placeholder='Input Title'
                  ></textarea>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='  font-semibold'>
                    Activity&apos;s Status
                  </label>
                  <select
                    value={newActivity.completed}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        completed: e.target.value === "true",
                      })
                    }
                    className='appearance-none focus:outline-none focus:shadow-custom-focus border bg-transparent border-border px-4 py-2 w-full rounded-lg'
                  >
                    <option value='false'>Not Done</option>
                    <option value='true'>Done</option>
                  </select>
                </div>
                <div className='flex gap-2'>
                  <button
                    role='button'
                    aria-label='Add Activity'
                    onClick={handleAddNewActivity}
                    className='bg-button-bg hover:bg-button-hover  text-text-primary font-bold px-4 py-2 rounded-lg'
                  >
                    Add Activity
                  </button>
                  <button
                    role='button'
                    aria-label='Cancel add activity'
                    onClick={() => {
                      setShowModal(false);
                      document.body.style.overflow = "auto";
                    }}
                    className='bg-button-cancel-bg hover:bg-button-cancel-hover font-bold px-4 py-2 rounded-lg'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <div className='flex justify-center mb-4'>
            <button
              onClick={() => setShowModal(true)}
              className='bg-green-500 text-white px-4 py-2 rounded'
            >
              Add New Activity
            </button>
          </div> */}
          <div className='shadow-custom-todo rounded-lg  p-8 flex flex-col gap-8 w-full'>
            <ul
              //   className='flex border-border border py-4 px-2 flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4 w-full'
              className='grid  gap-8 w-full'
            >
              {paginatedList.map((todo) => (
                <li
                  key={todo.id}
                  className='border-2  hover:scale-[1.03] z-1 rounded-lg justify-center border-border p-4 items-center hover:shadow-custom-focus text-center flex flex-col gap-2 w-full'
                >
                  <div className='grid grid-cols-[1fr_auto] w-full justify-center items-center gap-4'>
                    {/* <strong>{todo.title}</strong> */}
                    <NavLink
                      to={`/todo/${todo.id}`}
                      className='todo-link  justify-between items-center   w-full '
                    >
                      <div className='text-left flex flex-col items-start '>
                        <h2 className='font-bold underline w-full'>
                          Assigned to: User {todo.userId}
                        </h2>
                        <p>{todo.title}</p>
                      </div>
                    </NavLink>

                    {todo.completed ? (
                      <button
                        role='button'
                        aria-label='Change completion status'
                        onClick={() => handleCompleteActivity(todo.id)}
                        className={`font-bold   w-fit  hover:scale-[1.1]  hover:shadow-custom-focus border border-border rounded-lg px-4 py-2  ${
                          todo.completed
                            ? "text-status-done"
                            : "text-status-notDone"
                        }`}
                      >
                        <i className='fa-solid fa-check'></i>
                      </button>
                    ) : (
                      <button
                        role='button'
                        aria-label='Change completion status'
                        onClick={() => handleCompleteActivity(todo.id)}
                        className={`font-bold   w-fit  hover:scale-[1.1]  border hover:shadow-custom-focus border-border rounded-lg px-4 py-2  ${
                          todo.completed
                            ? "text-status-done"
                            : "text-status-notDone"
                        }`}
                      >
                        <i className='fa-solid fa-hourglass-start'></i>{" "}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex justify-center items-center gap-4'>
              <button
                role='button'
                aria-label='Go to first list page'
                onClick={() => {
                  handleFirstPage(), handleFadePrevButton();
                }}
                style={{
                  //   padding: "5px 10px",
                  //   margin: "0 10px",
                  //   backgroundColor: "#FFF",
                  //   border: "1px solid #000",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  ...firstPageButtonStyle,
                }}
                className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
              >
                <i className='fa-solid fa-angles-left'></i>{" "}
              </button>
              <button
                role='button'
                aria-label='Go to previous list page'
                onClick={() => {
                  handlePrevPage(), handleFadePrevButton();
                }}
                style={{
                  //   padding: "5px 10px",
                  //   margin: "0 10px",
                  //   backgroundColor: "#FFF",
                  //   border: "1px solid #000",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  ...prevButtonStyle,
                }}
                className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
              >
                <i className='fa-solid fa-chevron-left'></i>{" "}
              </button>
              <span style={{ padding: "5px 10px", fontWeight: "bold" }}>
                {currentPage}
              </span>

              <button
                role='button'
                aria-label='Go to next list page'
                onClick={() => {
                  handleNextPage(), handleFadeNextButton();
                }}
                style={{
                  //   padding: "5px 10px",
                  //   margin: "0 10px",
                  //   backgroundColor: "#FFF",
                  //   border: "1px solid #000",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  ...nextButtonStyle,
                }}
                className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
              >
                <i className='fa-solid fa-chevron-right'></i>{" "}
              </button>

              <button
                role='button'
                aria-label='Go to last list page'
                onClick={() => {
                  handleLastPage(), handleFadeNextButton();
                }}
                style={{
                  //   padding: "5px 10px",
                  //   margin: "0 10px",
                  //   backgroundColor: "#FFF",
                  //   border: "1px solid #000",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  ...lastPageButtonStyle,
                }}
                className='bg-button-bg hover:bg-button-hover text-text-primary font-bold px-4 py-2 rounded-lg'
              >
                <i className='fa-solid fa-angles-right'></i>{" "}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodosList;
