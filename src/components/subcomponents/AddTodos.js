// Import React and useState from React for creating functional components with state
import React, { useState } from 'react';

// Import Material-UI components for building the UI
import {
  Typography,
  Paper,
  Box,
} from "@mui/material";

// Import a custom button component for consistency in the application
import CommonButton from '../commoncomponents/CommonButton';

// Import a custom text field component for consistency in the application
import CommonTextField from '../commoncomponents/CommonTextFeild';

// Import the hook for accessing the Redux dispatch function
import { useAppDispatch } from "../../app/hooks";

// Import asynchronous actions for adding and fetching todos from the Redux slice
import { addTodoAsync, fetchTodosAsync } from "../../features/todosSlice";

// Import styles from a separate file for better code organization
import useStyles from '../assets/addtodostyle';

// Functional component for adding todos
const AddTodos = () => {
  // Initialize styles and dispatcher
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // State to manage the text input for new todos
  const [newTodoText, setNewTodoText] = useState("");

  // Asynchronous function to add a new todo
  const addTodo = async (text) => { 
    try {
      // Dispatch the addTodoAsync action within the try block
      await dispatch(addTodoAsync(text));
      
      // Fetch updated todos after adding a new todo
      await dispatch(fetchTodosAsync());
      
      // Clear the input field after successful addition
      setNewTodoText("");
    } catch (error) {
      // Handle errors if needed
      console.error("Error adding todo:", error);
    }
  };

  // Render the component
  return (
    <>
      {/* Heading for the todo section */}
      <Typography variant="h3" component="h1" gutterBottom>
        Todos
      </Typography>

      {/* Container for adding new todos */}
      <Paper className={classes.addTodoContainer}>
        {/* Flex container with text input and add button */}
        <Box display="flex" flexDirection="row">
          {/* Text input for new todos */}
          <Box flexGrow={1}>
            <CommonTextField
              fullWidth
              value={newTodoText}
              onKeyPress={(event) => {
                // Check if Enter key is pressed and call addTodo function
                if (event.key === "Enter") {
                  addTodo(newTodoText);
                }
              }}
              onChange={(event) => setNewTodoText(event.target.value)}
            />
          </Box>

          {/* Button to add a new todo */}
          <CommonButton
            onClick={() => addTodo(newTodoText)}
            icontext="add" styleclass={classes.addTodoButton} buttontext="Add"
          />
        </Box>
      </Paper>
    </>
  );
};

export default AddTodos; // Export the component
