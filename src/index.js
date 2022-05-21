import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { NoteProvider } from "./Context/note-context";
import { AuthProvider } from "./Context/authorization-context";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./Context/filter-context";
import { ThemeProvider } from "./Context/theme-context";


// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <FilterProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </FilterProvider>
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
