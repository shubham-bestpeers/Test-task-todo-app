// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import API functions from the service folder
import * as apiFunctions from '../service/UseApi';

// Async thunk for fetching todos
export const fetchTodosAsync = createAsyncThunk('users/fetchTodos', async () => {
  const response = await apiFunctions.makeRequest('GET');
  return response.data;
});

// Async thunk for deleting a todo
export const deleteTodoAsync = createAsyncThunk('users/deleteTodo', async (commentId) => {
  const response = await apiFunctions.makeRequest('DELETE', `${commentId}`);
  console.log("data",response.data)
  return response.data;
});

// Async thunk for adding a new todo
export const addTodoAsync = createAsyncThunk('users/addTodo', async (data) => {
  const response = await apiFunctions.makeRequest('POST', '', { text: data });
  return response.data;
});

// Async thunk for completing a todo
export const completedTodoAsync = createAsyncThunk('users/compeleteTodo', async (data) => {
  const response = await apiFunctions.makeRequest('PUT', data.id, { completed: !data.completed });
  return response.data;
});

// Create a slice for managing todos
const todosSlice = createSlice({
  name: 'todos',
  initialState: { data: [], status: 'idle', error: null, actionType: null },
  reducers: {

    // Reducer to set the action type in the state
    setActionType: (state, action) => {
      state.actionType = action.payload;
    },
  },
  
  // Extra reducers for handling async actions
  extraReducers: (builder) => {
    const asyncReducers = [
      { asyncThunk: fetchTodosAsync, actionType: 'fetchTodosAsync' },
      { asyncThunk: deleteTodoAsync, actionType: 'deleteTodoAsync' },
      { asyncThunk: addTodoAsync, actionType: 'addTodoAsync' },
    ];

    asyncReducers.forEach(({ asyncThunk, actionType }) => {
      
      // Handle pending (loading) state
      builder.addMatcher(
        (action) => action.type === asyncThunk.pending.toString(),
        (state) => {
          state.status = 'loading';
          state.error = null;
          state.actionType = actionType;
        }
      );

      // Handle fulfilled (success) state
      builder.addMatcher(
        (action) => action.type === asyncThunk.fulfilled.toString(),
        (state, action) => {
          state.data = action.payload;
          state.status = 'success';
          state.actionType = actionType;
        }
      );

      // Handle rejected (error) state
      builder.addMatcher(
        (action) => action.type === asyncThunk.rejected.toString(),
        (state, action) => {
          state.error = action.payload;
          state.status = 'error';
        }
      );
    });
  },
});

// Export the action creators and the reducer
export const { setActionType } = todosSlice.actions;
export default todosSlice.reducer;
