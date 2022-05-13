import "../notepage/note.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { useNote}  from "../../Context/note-context";

const Archive = () =>{
    const { noteState } = useNote();
    const { archive } = noteState;
    return (
        <div className="App">
            <Navbar/>
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                {archive.map((item) => (
            <div className="note-list">
                <div className="note-head">
                    <h2 className="note-list-title">{item.title}</h2>
                    <span className="pin"><i class="fad fa-thumbtack"></i></span>
                </div>

                <p className="note-list-content">{item.mainContent}</p>

                <div className="note-foot">
                    <div className="foot-icons">
                        <span><i class="fad fa-archive note-list-icon"></i></span>
                        <span><i class="fad fa-trash note-list-icon"></i></span>
                    </div>
                </div>
            </div>
            ))}
                </div>
            </div>
        </div>
    );
}

export { Archive };