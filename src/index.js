// import React from "react";
// import ReactDOM from "react-dom";
// // import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
// import { createRoot } from "react-dom/client";

// import App from "./App";
// import "./index.css";

// // ReactDOM.render(
// //   <Router>
// //     <App />
// //   </Router>,
// //   document.getElementById("root")
// // );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Router>
//     <App />
//   </Router>
// );
import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import { BrowserRouter as Router } from "react-router-dom"; // Ensure BrowserRouter is imported

import App from "./App";
import "./index.css";

// Create the root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
