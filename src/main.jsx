import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RoleProvider } from "./context/RoleContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { ThemeProvider } from "./context/ThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<ThemeProvider>
<TransactionsProvider>
  <RoleProvider>
    <App />
  </RoleProvider>
</TransactionsProvider>
</ThemeProvider>
  </React.StrictMode>
);