import  {  useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CustomLocalStorage from "../Data/CustomLocalStorage";
import { useState } from "react";
import { use } from "react";
import powerpuffGirlsImage from "../assets/deleted.png";


  // const [todoDetailsToFetch, setTodoDetailsToFetch] = useState(null); 

const TodoDetails = () => {
  const [todoDetailsToFetch, setTodoDetailsToFetch] = useState({}); 
  const [editedUser, setEditedUser] = useState({});
    const [editedStatus, setEditedStatus] = useState({}); 
  const [editedTitle, setEditedTitle] = useState({}); 
    const [editedTodoId, setEditedTodoId] = useState({}); 
  const [editing, setEditing] = useState("false")
  const navigate = useNavigate()
  const [deleted, setDeleted] = useState("false");


  const { id } = useParams();
  const todoId = Number(id);
    // console.log(todoId, "todoId")
    // console.log(id, "id")

  const fetchTodoDetails = async () => {
    try {
      const fetchedTodo = await CustomLocalStorage.fetchTodoDetail(
        "todos",
          todoId
      );
        setTodoDetailsToFetch(fetchedTodo);
        // console.log(todoDetailsToFetch, "data fetched")
    } catch (error) {
      console.error("Error fetching todo details:", error); 
      console.log("Error fetching todo details:", error);
    }
  };

  useEffect(() => {
    fetchTodoDetails(); 
  }, [todoId]); 

  const handleDelete = (id) => {
      console.log(id)
      // setTodoDetailsToFetch(todoDetailsToFetch.filter((todo) => todo.id !== id));
    CustomLocalStorage.delete("todos", id);
    // window.location.reload();
    setDeleted("true")
  };
  
  const startEditing = (todoDetailsToFetch) => {
    setEditing("true")
      // console.log(todoDetailsToFetch, "tododetails to")
      setEditedTodoId(todoDetailsToFetch.id);
      // console.log(editedTodoId, "editedTodoedid")
      setEditedUser(todoDetailsToFetch.userId);
      setEditedTitle(todoDetailsToFetch.title);
    setEditedStatus(todoDetailsToFetch.completed);
    // console.log(editedTitle)
    };
  
    const saveChanges = (id) => {
      if (!editedTitle.trim()) {
        alert("Title cannot be empty.");
        return;
      }
      
  // console.log("saving...")
      setTodoDetailsToFetch(
        ({
          
          title: editedTitle,
          completed: editedStatus,
          userId: editedUser,
          id: id,
        }) 
      );
      // console.log(todoDetailsToFetch, "tododetailstofetch");
      CustomLocalStorage.update("todos", {
        title: editedTitle,
        completed: editedStatus,
        userId: editedUser,
        id: id,
      });
  
      setEditedTodoId(null);
      setEditing("false")
    };
  
    const cancelEditing = () => {
      setEditedTodoId(null);
      // setEditedTitle("");
      setEditing(false);
    };

  return (
    <div className='bg-background  mx-auto flex flex-col items-center justify-center py-20'>
      <div
        // id='detailsCard'
        className='shadow-custom-hover  mx-auto  bg-primary py-2 px-4  max-w-[70%] text-text-primary rounded-lg z-1 flex flex-col gap-4'
      >
        {editing === "true" ? (
          <div className='flex flex-col p-2 gap-4'>
            <h2 className='font-bold  text-center'>
              Edit Activity&apos;s Details
            </h2>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>User</label>
              <select
                value={editedUser}
                onChange={(e) => setEditedUser(e.target.value)}
                className='border appearance-none border-border bg-transparent focus:outline-none focus:shadow-custom-focus hover:shadow-custom-focus px-2 py-1 rounded-lg'
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>Title</label>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className='border bg-transparent border-border focus:outline-none focus:shadow-custom-focus hover:shadow-custom-focus px-2 py-1 rounded-lg'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>Status</label>

              <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value === "true")}
                className='border appearance-none border-border bg-transparent focus:outline-none focus:shadow-custom-focus hover:shadow-custom-focus px-2 py-1 rounded-lg'
              >
                <option value='false'>Not Done</option>
                <option value='true'>Done</option>
              </select>
            </div>

            <div className='flex gap-2 items-center justify-center'>
              <button
                onClick={() => saveChanges(todoDetailsToFetch.id)}
                className='px-4 py-2  text-text-primary  hover:text-text-secondary  rounded'
              >
                <i className='fa-solid fa-check'></i>
              </button>
              <button
                onClick={cancelEditing}
                className='text-button-delete-bg hover:text-button-delete-hover  px-4 py-2 rounded'
              >
                <i className='fa-solid fa-x'></i>
              </button>
            </div>
          </div>
        ) : (
          <div className=' w-full h-full bg-primary p-2 rounded-lg flex flex-col  gap-4 backface-hidden'>
            {/* <h1 className='font-bold'>Details on Selected Activity</h1> */}
            {deleted === "false" ? (
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold  text-center'>More Details</h1>
                <div className='flex flex-col  items-start '>
                  <p className=' font-semibold'>Title:</p>
                  <p>{todoDetailsToFetch.title}</p>
                </div>
                <div className='flex flex-col items-start '>
                  <p className=' font-semibold'>Assigned To:</p>
                  <p>User&nbsp;{todoDetailsToFetch.userId}</p>
                </div>
                <div className='flex flex-col items-start '>
                  <p className=' font-semibold'>Status:</p>
                  <p>{todoDetailsToFetch.completed ? "Done" : "Not Done"}</p>
                </div>
                <div className='flex  items-center justify-center gap-2'>
                  <button
                    onClick={() => startEditing(todoDetailsToFetch)}
                    className='px-4 py-2  text-text-primary  hover:text-text-secondary  rounded'
                  >
                    <i className='fa-solid fa-pen-to-square'></i>
                  </button>
                  <button
                    onClick={() => handleDelete(todoDetailsToFetch.id)}
                    className='text-button-delete-bg hover:text-button-delete-hover  px-4 py-2 rounded'
                  >
                    <i className='fa-solid fa-trash-can'></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center p-3 gap-4'>
                <img
                  src={powerpuffGirlsImage}
                  alt='404 Page Image'
                  className='h-40'
                />

                <div className='flex flex-col text-center items-center'>
                  <h2 className='font-bold'>Mission Accomplished!</h2>
                  <p>Bye-bye, clutter. Don’t look back.</p>
                </div>
                <NavLink to='/'>
                  <i className='fa-solid fa-house text-button-bg hover:text-button-hover  hover:scale-[1.1]'></i>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetails;
