// Import necessary dependencies and components
import React from "react";

// Import components for drag-and-drop functionality
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Import styles for the task list
import useStyles from "../assets/taskliststyles";

// Import individual todo item component
import TodoItem from "./TodoItem";

// Import custom hooks for Redux and side effects
import {
  useAppDispatch,
  useAppSelector,
  useCustomState,
  useCustomEffect,
} from "../../app/hooks";

// Import Redux actions for managing todos
import {
  fetchTodosAsync,
  completedTodoAsync,
  deleteTodoAsync,
  swapTodoAsync
} from "../../features/todosSlice";

// Helper function to reorder items in the list after drag and drop
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8; // Grid size for styling

// Styling function for individual draggable items
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

// Styling function for the entire droppable list
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
});

// Functional component for the TaskList
const TaskList = () => {
  const classes = useStyles(); // Apply styles using makeStyles
  const dispatch = useAppDispatch(); // Access the Redux dispatch function

  // Retrieve data and action type from Redux state
  const { data: item, actionType } = useAppSelector((state) => state.todos);
  
  // Manage items state using custom hook
  const [items, setItems] = useCustomState([]);

  // Fetch todos on component mount
  useCustomEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  // Update items when todos are fetched
  useCustomEffect(() => { 
    if (actionType === "fetchTodosAsync" && item.length !== undefined) {
      setItems(item);
    }
  }, [item, actionType]);

  // Handle drag and drop end event
  const onDragEnd = (result) => { 
    if (!result.destination) {
      return;
    }  

    let data = {
      sourceId : result.source.index,
      destinationId  : result.destination.index
    }
    dispatch(swapTodoAsync(data))
    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    ); 
    setItems(updatedItems);
  };
    

  // Handle delete todo event
  const handleDelete = async (itemId) => {
    try {
      await dispatch(deleteTodoAsync(itemId));
      const updatedTodos = await dispatch(fetchTodosAsync());
      setItems(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle toggle todo completed event
  const toggleTodoCompleted = async (itemdata) => {
    try {
      await dispatch(completedTodoAsync(itemdata));
      const updatedTodos = await dispatch(fetchTodosAsync());
      setItems(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Render the component with drag and drop context and droppable area
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              ...getListStyle(snapshot.isDraggingOver),
              overflowY: "auto",
            }}
          >
            {/* Map through items and render draggable TodoItem components */}
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <TodoItem
                    provided={provided}
                    snapshot={snapshot}
                    item={item}
                    classes={classes}
                    getItemStyle={getItemStyle}
                    handleDelete={handleDelete}
                    toggleTodoCompleted={toggleTodoCompleted}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList; // Export the component
