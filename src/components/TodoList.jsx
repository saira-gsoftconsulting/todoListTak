import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addTodo, removeTodo, updateTodo } from "../features/todos/todoSlice";
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch(); 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const onSubmit = (data) => {
    if (editMode) {
      dispatch(
        updateTodo({
          id: editTodo.id,
          title: data.title,
        })
      );
      setSnackbar({ open: true, message: "Task updated successfully" });
      setEditMode(false);
      setEditTodo("");
    } else {
      dispatch(addTodo({ id: Date.now(), task: data.task }));
      setSnackbar({ open: true, message: "Task added successfully" });
    }
    reset();
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
    setSnackbar({ open: true, message: "Task removed successfully" });
  };

  const handleEdit = (todo) => {
    setEditMode(true);
    setEditTodo(todo);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="To-Do"
          variant="outlined"
          {...register("title", { required: true })}
          error={errors.task}
          helperText={errors.task ? "Task is required" : ""}
          defaultValue={editMode ? editTodo?.task : ""}
        />
        <Button type="submit" variant="contained" color="primary">
          {editMode ? "Update To-Do" : "Add To-Do"}
        </Button>
      </form>
      <List>
        {todos.map((data) => (
          <ListItem key={data.id}>
            {data.title}
            {data.price}
  
            <IconButton onClick={() => handleEdit(data)}>

              <Edit />
            </IconButton>
            <IconButton onClick={() => handleRemove(data.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </div>
  );
};

export default TodoList;
