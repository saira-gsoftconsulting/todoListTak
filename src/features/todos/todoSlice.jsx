import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [], 
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
      
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        
        todo.title = title;
      }
    },
  },
});

export const { setTodos, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
