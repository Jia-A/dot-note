import "../notepage/note.css";
import axios from "axios";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { useNote} from "../../Context/note-context";
import { useAuth } from "../../Context/authorization-context";

const Archive = () =>{
const { noteState, noteDispatch } = useNote();
const { archive } = noteState;
const { authState } = useAuth();
const { token } = authState;

const restoreNoteFromArchive = async (item) =>{
console.log(item._id)
try{
    const response = await axios({
        method:"post",
        url:`/api/archives/restore/${item._id}`,
        headers:{authorization:token}, 
    });
    console.log(response)
    if(response.status === 200 || response.status === 201){
        noteDispatch({type : "RESTORE_ARCHIVED_NOTE", payload : { archive : response.data.archives, note : response.data.notes}})
    }
}
catch(error){
    console.log(error);
}
}

const moveToTrashFromArchive = async (item) => {
console.log(item._id);
try{
const response = await axios({
method:"delete",
url:`/api/archives/delete/${item._id}`,
headers:{authorization: token},
});
console.log(response)
if(response.status === 200 || response.status === 201){
noteDispatch({type : "DELETE_NOTE_FROM_ARCHIVE", payload : {archive : response.data.archives, trash : item}})
}
}
catch (error){
console.log(error);
}
}

return (
<div className="App">
    {/* <Navbar /> */}
    <div className="main-container">
        <Sidebar />
        <div className="right-cont">
            <h2 className="page-head">Archived Notes</h2>
            {archive.map((item) => (
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
                        <span onClick={()=>restoreNoteFromArchive(item)}><i class="fad fa-inbox-out note-list-icon"></i></span>
                        <span onClick={()=>moveToTrashFromArchive(item)}><i class="fad fa-trash note-list-icon"></i></span>
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