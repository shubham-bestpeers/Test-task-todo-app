// Import React and useState from React for creating functional components with state
import React, { useState } from 'react';

// Import Material-UI components for building the UI
import { Typography, Paper, Box } from "@mui/material";

// Import SweetAlert2 for displaying alerts
import Swal from 'sweetalert2';

// Import custom components
import CommonButton from '../commoncomponents/CommonButton';
import CommonTextField from '../commoncomponents/CommonTextFeild';
import { useAppDispatch } from "../../app/hooks";
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

  // Function to add a new todo
  const addTodo = async (text) => {
    try {
      // Check if the text is valid
      if (text.trim().length > 0) {
        // Dispatch the addTodoAsync action within the try block
        await dispatch(addTodoAsync(text));

        // Fetch updated todos after adding a new todo
        await dispatch(fetchTodosAsync());

        // Clear the input field after successful addition
        setNewTodoText("");

        // Show success alert using SweetAlert2
        Swal.fire({
          title: "Todo Added",
          text: "Your todo has been added successfully.",
          icon: "success",
          timer: 1000
        });
      } else {
        // Show alert for invalid input using SweetAlert2
        Swal.fire({
          title: "Invalid Input",
          text: "Please enter a valid todo text with more than 1 character.",
          icon: "info",
          timer: 1000
        });
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error adding todo:", error);
    }
  };

  // Event handler for key press (Enter)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call the addTodo function when Enter key is pressed
      addTodo(newTodoText);
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
              onKeyPress={handleKeyPress}
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

export default AddTodos;
