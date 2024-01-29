// Import React for creating functional components
import React from "react"; 

// Import Material-UI components for UI elements
import { Box, Checkbox, Typography } from "@mui/material"; 

// Import custom button component
import CommonButton from "../commoncomponents/CommonButton"; 

const TodoItem = ({ provided, snapshot, item, classes, getItemStyle, handleDelete, toggleTodoCompleted }) => {
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
          onClick={() => handleDelete(item.id)}
          icontext="delete"
          styleclass={classes.deleteTodo}
          buttontext="Delete"
        />
      </Box>{" "}
    </div>
  );
};

export default TodoItem; // Export the component
