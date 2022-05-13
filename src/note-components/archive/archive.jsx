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
console.log("got positive response");
noteDispatch({type : "DELETE_NOTE_FROM_ARCHIVE", payload : {archive : response.data.archives, trash : item}})
}
}
catch (error){
console.log(error);
}
}
return (
<div className="App">
    <Navbar />
    <div className="main-container">
        <Sidebar />
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
                        <span><i class="fad fa-inbox-out note-list-icon"></i></span>
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