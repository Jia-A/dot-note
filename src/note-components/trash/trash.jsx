import "../notepage/note.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Trash = () =>{
    const { noteState, noteDispatch } = useNote(); 
    const { trash } = noteState;
    return (
        <div className="App">
            <Navbar/>
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                <h2 className="page-head">Trash Notes</h2>
                    {trash.map((item) => (
                    <div className="note-list">
                        <div className="note-head">
                            <h2 className="note-list-title">{item.title}</h2>
                        </div>

                        <p className="note-list-content">{item.mainContent}</p>

                        <div className="note-foot">
                            <div className="foot-icons">
                                <span><i class="fad fa-inbox-in note-list-icon"></i></span>
                                <span onClick={(e)=>noteDispatch({type : "DELETE_FROM_TRASH", payload : item._id})}><i class="fad fa-trash note-list-icon"></i></span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Trash };