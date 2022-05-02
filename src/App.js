import "./App.css";
import logo from "./logo.png";
import { Archive } from "./note-components/archive/archive";
import { Homepage } from "./note-components/homepage/homepage";
import { Note } from "./note-components/notepage/note";
import { Trash } from "./note-components/trash/trash";

 

function App() {
  return (
    <div className="App">
      <Trash/>
    </div>
  );
}

export default App;
