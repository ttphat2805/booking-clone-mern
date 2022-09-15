import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SearchContextProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <DarkModeContextProvider>
          <ToastContainer />
          <App />
        </DarkModeContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
