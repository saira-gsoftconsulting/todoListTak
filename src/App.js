import "./App.css";
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import axios from "axios";
import { toast } from "react-toastify";
import { setTodos } from "./features/todos/todoSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [data, setdata] = useState([]); 
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    try {
      setLoading(true);
      let response = await axios.get("https://dummyapi.online/api/todos");
      console.log("response", response);
      if (response?.status === 200) {
        setdata(response?.data);
        dispatch(setTodos(response?.data))
        toast.success("Data is fetched successfully");
      } else {
        setdata([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect( () => {
  //   fetch()
  // }, []);
  console.log("data=============", data, loading);
  const primary = purple[900];
  return (
    <>
      {loading ? (
        "loading........."
      ) : (
        <div className="App">
          <Typography variant="h5" color={primary} component="h2">
            Create a Simple To-Do List Using Material-UI
          </Typography>
          <Button onClick={fetch}>Fetch users</Button>
          <TodoList />
        </div>
      )}
    </>
  );
}
export default App;

