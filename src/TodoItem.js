import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import CommonButton from "./commoncomponents/CommonButton";

const TodoItem = ({ provided, snapshot, item, classes }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style
      )}
    >
      <Box
        key={item.id}
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.todoContainer}
      >
        <Checkbox
          checked={item.completed}
          onChange={() => toggleTodoCompleted(item)}
        />
        <Box flexGrow={1}>
          <Typography
            variant="body1"
            className={item.completed ? classes.todoTextCompleted : ""}
          >
            {item.text}
          </Typography>
        </Box>
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

export default TodoItem;
