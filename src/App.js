import "./App.css";
import logo from "./logo.png";
import { Archive } from "./note-components/archive/archive";
import { Login } from "./note-components/authentication/login";
import { Homepage } from "./note-components/homepage/homepage";
import { Note } from "./note-components/notepage/note";
import { Trash } from "./note-components/trash/trash";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./note-components/authentication/signup";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path = "/" element = { <Homepage/> } />
      <Route path = "/notes" element = { <Note/> } />
      <Route path = "/login" element = { <Login/> } />
      <Route path = "/signup" element = { <Signup/> } />
      <Route path = "/trash" element = { <Trash/> } />
      <Route path = "/archive" element = { <Archive/> } />
      </Routes>
    </div>
  );
}

export default App;
