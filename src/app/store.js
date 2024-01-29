// Import configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the combined rootReducer from the rootReducer file
import rootReducer from './rootReducer';

// Configure and create the Redux store using the combined rootReducer
export const store = configureStore({
  reducer: rootReducer, // Set the rootReducer as the root reducer for the store
});
