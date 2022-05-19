import "./note.css";
import axios from "axios";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/authorization-context";
import { noteCreate } from "../../note-API/note-create";
import { useNavigate } from "react-router-dom";
import { Filter } from "../filter/filter";
import { useFilter } from "../../Context/filter-context";



const Note = () =>{
const { noteState, noteDispatch, notes, setNote, tag } = useNote();
const { authState } = useAuth();
const navigate = useNavigate();
const { token } = authState;
const { note, priority } = noteState;
const { filterState, filteredNotes } = useFilter();


const noteCreateFuntion = async (e) => {
e.preventDefault();
if (token) {
noteCreate(notes, token, noteDispatch);
console.log(notes.backColor)
setNote({ title: "", mainContent: "", backColor : "", tagName:"", priorityLevel : "", currentDate : ""});

} else {
navigate("/login")
}
};

// const dateAndTime = () =>{
//     const date = new Date().toLocaleString();
//     return date;
// }

const moveToArchive = async (item) =>{
try{
const response = await axios({
method : "post",
data : { note : item },
url : `api/notes/archives/${item._id}`,
headers : {authorization : token},
});
console.log("try passed");
if(response.status === 200 || response.status === 201){
noteDispatch({type : "MOVE_TO_ARCHIVE", payload : { note : response.data.notes, archive : response.data.archives}})
}
}
catch (error){
console.log(error);
}
console.log("Done");
}


const moveToTrash = async (item) => {
console.log(item._id);
try{
const response = await axios({
method:"delete",
url:`/api/notes/${item._id}`,
headers:{authorization: token},
});
console.log(response)
if(response.status === 200 || response.status === 201){
noteDispatch({type : "DELETE_NOTE", payload : {note : response.data.notes, trash : item}})
}
}
catch (error){
console.log(error);
}
}




return(
<div className="App">
    <Navbar />
    <div className="main-container">
        <Sidebar />
        <div className="right-cont">
            <Filter />
            <div className="note-container" style={{backgroundColor : notes.backColor}}>
                <div className="note-head">
                    <input type="text" className="note-title" placeholder="Title" value={notes.title} onChange={(e)=>
                    setNote(() => ({
                    ...notes, title: e.target.value }))}/>
                    <span className="pin"><i class="fal fa-thumbtack"></i></span>
                </div>

                <textarea name="" className="note-text" cols="30" rows="10" placeholder="Write your note here..."
                    value={notes.mainContent}
                    onChange={(e)=> setNote(() => ({ ...notes, mainContent : e.target.value, currentDate : new Date().toLocaleString()}))}></textarea>

                <div className="note-foot">
                    <select name="tags" id="" onClick={(e)=>setNote(()=>({...notes, tagName : e.target.value}))}>
                        <option selected disabled>Tags</option>
                        {tag.map((item)=> (
                        <option value={item}>{item}</option>))}
                    </select>
                    <select name="priority" id="" onClick={(e)=>setNote(()=>({...notes, priorityLevel :
                        e.target.value}))}>
                        <option selected disabled>Priority</option>
                        {priority.map((item)=> (
                        <option value={item}>{item}</option>))}
                    </select>
                    <div className="foot-icons">
                        <button className="button read-btn" onClick={noteCreateFuntion}><i
                                class="fal fa-plus"></i></button>
                        <input type="color" id="x" value={notes.backColor} onChange={(e)=> setNote(() => ({...notes,
                        backColor : e.target.value }))} />
                        <button className="button read-btn"><i class="fal fa-tag"></i></button>
                    </div>
                </div>
            </div>
            {filteredNotes(note, filterState).map((item)=> (
            <div className="note-list" style={{backgroundColor : item.backColor}}>
                <div className="note-head">
                    <h2 className="note-list-title">{item.title}</h2>
                    <span className="pin"><i class="fad fa-thumbtack"></i></span>
                </div>

                <p className="note-list-content">{item.mainContent}</p>
                <span>{item.tagName}</span>
                <span>{item.priorityLevel}</span>
                <span>{item.currentDate}</span>

                <div className="note-foot">
                    <div className="foot-icons">
                        <span onClick={()=>moveToArchive(item)}><i class="fad fa-inbox-in note-list-icon"></i></span>
                        <span onClick={()=>moveToTrash(item)}><i class="fad fa-trash note-list-icon"></i></span>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>

</div>
);

}
export { Note };