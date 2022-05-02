import "../notepage/note.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";

const Trash = () =>{
    return (
        <div className="App">
            <Navbar/>
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                    Deleted Notes
                </div>
            </div>
        </div>
    );
}

export { Trash };