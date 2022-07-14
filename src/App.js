import "./App.css";
import { Archive } from "./note-components/archive/archive";
import { Login } from "./note-components/authentication/login";
import { Homepage } from "./note-components/homepage/homepage";
import { Note } from "./note-components/notepage/note";
import { Trash } from "./note-components/trash/trash";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./note-components/authentication/signup";
import { Label } from "./note-components/label/label";
import { useTheme } from "./Context/theme-context";
import { Toaster } from "react-hot-toast"


function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme === "dark" ? "dark-theme" : ""}`}>
      <Toaster/>
      <Routes>
      <Route path = "/" element = { <Homepage/> } />
      <Route path = "/notes" element = { <Note/> } />
      <Route path = "/login" element = { <Login/> } />
      <Route path = "/signup" element = { <Signup/> } />
      <Route path = "/trash" element = { <Trash/> } />
      <Route path = "/archive" element = { <Archive/> } />
      <Route path = "/label" element = { <Label/> } />
      </Routes>
    </div>
  );
}

export default App;
