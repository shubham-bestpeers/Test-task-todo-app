// Import combineReducers function from Redux to combine multiple reducers into one
import { combineReducers } from 'redux';

// Import todosReducer from the todosSlice file
import todosReducer from '../features/todosSlice';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  todos: todosReducer, // Combine todosReducer under the 'todos' key in the state
});

export default rootReducer; // Export the combined rootReducer
