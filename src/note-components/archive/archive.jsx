import "../notepage/note.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";

const Archive = () =>{
    return (
        <div className="App">
            <Navbar/>
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                    Archived Notes
                </div>
            </div>
        </div>
    );
}

export { Archive };