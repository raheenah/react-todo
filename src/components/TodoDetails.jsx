import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomLocalStorage from "../Data/CustomLocalStorage";

const TodoDetails = () => {
  // Get 'id' from URL params (useParams will give it as a string)
  const { id } = useParams();
  const todoId = Number(id); // Convert it to a number if necessary
    console.log(todoId, "todoId")
    console.log(id, "id")
  const [todoDetailsToFetch, setTodoDetailsToFetch] = useState({}); // State to store fetched todo details

  // Fetch todo details based on the 'id' from the URL
  const fetchTodoDetails = async () => {
    try {
      const fetchedTodo = await CustomLocalStorage.fetchTodoDetail(
        "todos",
          todoId
        
      );
        setTodoDetailsToFetch(fetchedTodo);
        // console.log(todoDetailsToFetch)
    } catch (error) {
      console.error("Error fetching todo details:", error); // Handle any errors
      console.log("Error fetching todo details:", error); // Handle any errors
    }
  };

  // useEffect that runs when 'id' changes
  useEffect(() => {
    fetchTodoDetails(); // Fetch the todo details when 'id' changes
  }, [todoId]); // Only re-run when 'todoId' changes

  return (
    <div>
      <h1>Todo Details</h1>
      {todoDetailsToFetch ? (
        <div>
          <h2>{todoDetailsToFetch.title || "No Title Available"}</h2>
          <p>{todoDetailsToFetch.id}</p>
          <p>{todoDetailsToFetch.userId}</p>
          <p> Status : {todoDetailsToFetch.completed ? "Done" : "Not Done"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TodoDetails;
