// Import necessary React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom";

// Import MUI's CssBaseline to apply basic styling to the entire app
import CssBaseline from "@mui/material/CssBaseline";

// Import your Todos component
import Todos from "./components/subcomponents/Todos";

// Import Provider from react-redux to provide the Redux store to the app
import { Provider } from "react-redux";

// Import the Redux store from ./app/store
import { store } from "./app/store";

// Render the app in StrictMode for additional development checks
ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the app with the Redux Provider, providing it the store */}
    <Provider store={store}>
      {/* Apply basic styling to the entire app */}
      <CssBaseline />
      
      {/* Render the Todos component */}
      <Todos />
    </Provider>
  </React.StrictMode>,
  // Attach the app to the HTML element with the id "root"
  document.getElementById("root")
);
