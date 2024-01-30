// Import React for creating functional components
import React from "react"; 

// Import SweetAlert2 for displaying alerts
import Swal from 'sweetalert2';

// Import Material-UI components for UI elements
import { Box, Checkbox, Typography } from "@mui/material"; 

// Import custom button component
import CommonButton from "../commoncomponents/CommonButton"; 

const TodoItem = ({ provided, snapshot, item, classes, getItemStyle, handleDelete, toggleTodoCompleted }) => {
 
  const showDeleteConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(item.id);
        Swal.fire({
          title: "Deleted!",
          text: "Your todo has been deleted.",
          icon: "success",
          timer: 1000, // Time in milliseconds (2 seconds in this example)
          timerProgressBar: true, // Show a progress bar while the timer is running
          showConfirmButton: false, // Hide the confirm button
        });
              }
    });
  };

  return (
    // Wrapper for draggable todo item
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style
      )}
    >
      {/* Container for todo item content */}
      <Box
        key={item.id}
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.todoContainer}
      >
        {/* Checkbox for marking todo as completed */}
        <Checkbox
          checked={item.completed}
          onChange={() => toggleTodoCompleted(item)}
        />

        {/* Text content of the todo item */}
        <Box flexGrow={1}>
          <Typography
            variant="body1"
            className={item.completed ? classes.todoTextCompleted : ""}
          >
            {item.text}
          </Typography>
        </Box>
        {/* Button to delete the todo item */}
        <CommonButton
          onClick={showDeleteConfirmation}
          icontext="delete"
          styleclass={classes.deleteTodo}
          buttontext="Delete"
        />
      </Box>{" "}
    </div>
  );
};

export default TodoItem; // Export the component
