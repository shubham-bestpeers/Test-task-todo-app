// Import React for creating functional components
import React from "react";

// Import Material-UI components for UI elements (Button, Icon)
import { Button, Icon } from "@mui/material";

// Functional component for a common button with an icon
const CommonButton = ({ onClick, icontext, styleclass, buttontext }) => { 

  // Render the button with the specified icon, style, and text
  return (
    <Button 
      className={styleclass} // Apply the specified CSS class
      startIcon={<Icon>{icontext}</Icon>} // Add an icon to the button
      onClick={onClick} // Handle click event
    >
      {buttontext} {/* Display the text on the button */}
    </Button>
  );
};

export default CommonButton; // Export the component
