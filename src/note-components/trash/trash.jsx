import "../notepage/note.css";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Trash = () =>{
    const { noteState, noteDispatch } = useNote(); 
    const { trash } = noteState;
    return (
        <div className="App">
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                <h2 className="page-head">Trash Notes</h2>
                    {trash.map((item) => (
                    <div className="note-list">
                        <div className="note-list-head">
                            <h3 className="note-list-title">{item.title}</h3>
                            {item.tagName.length>0 ? (
                        <span className="label">{item.tagName}</span> ) : ""}
                    {item.priorityLevel.length>0 ? (
                        <span className="label">{item.priorityLevel}</span>
                    ) : ""}
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