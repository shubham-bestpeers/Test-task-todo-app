// Import React for creating functional components
import React from "react";

// Import Material-UI TextField component for text input
import { TextField } from "@mui/material";

// Functional component for a common text field
const CommonTextField = ({ value, onKeyPress, onChange, fullWidth }) => {
  // Render the TextField component with specified props
  return (
    <TextField
      fullWidth={fullWidth} // Set the width to full if fullWidth is true
      value={value} // Set the current value of the text field
      onKeyPress={onKeyPress} // Handle key press events
      onChange={onChange} // Handle input change events
    />
  );
};

export default CommonTextField; // Export the component
