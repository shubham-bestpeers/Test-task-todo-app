// Import necessary components from MUI library
import { Container } from "@mui/material";

// Import TaskList component from the same directory
import TaskList from "./TaskList";

// Import AddTodos component from subcomponents directory
import AddTodos from '../subcomponents/AddTodos'

// Define the main Todos functional component
const Todos = () => (
  <Container maxWidth="md">
    {/* Render the AddTodos component */}
    <AddTodos />

    {/* Render the TaskList component */}
    <TaskList />
  </Container>
);

// Export the Todos component as the default export
export default Todos;
