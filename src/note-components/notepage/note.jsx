import "./note.css";
import axios from "axios";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/authorization-context";
import { noteCreate, editNote } from "../../note-API/note-create";
import { useNavigate } from "react-router-dom";
import { Filter } from "../filter/filter";
import { useFilter } from "../../Context/filter-context";
import { useState } from "react";
import Modal from "react-modal";
import { Navbar } from "../navbar/navbar";
import toast from "react-hot-toast"



const Note = () =>{
const { noteState, noteDispatch, notes, setNote, tag } = useNote();
const { authState } = useAuth();
const navigate = useNavigate();
const { token } = authState;
const { note, priority } = noteState;
const { filterState, filteredNotes } = useFilter();
const [ currentNote, setCurrentNote ] = useState({})
const [ addModal, setAddModal ] = useState(false);
const [ newNote, setNewNote ] =  useState({ title: "", mainContent: "", backColor : "", tagName : "", priorityLevel : "", currentDate : ""})

const editHandler = (editedNote) =>{
    setAddModal(true)
    setCurrentNote(editedNote);
    setNewNote(editedNote);
}


const customStyle = {
    overlay: {
      backgroundColor: "rgba(52, 58, 64, 0.8)",
    },
    content: {
      width: "18rem",
      height: "24rem",
      margin: "4rem auto",
      backgroundColor: "#1D3461",
      color : "#a0b2b9",
      textAlign : "center",
      border : "none",
      
    },
  };


const noteCreateFuntion = async (e) => {
e.preventDefault();
if (token) {
    if(notes.title !=="" && notes.mainContent !=="") {
noteCreate(notes, token, noteDispatch);
setNote({ title: "", mainContent: "", backColor : "", tagName:"", priorityLevel : "", currentDate : ""});
    } 
    else { toast.error("Please enter title and description!") }
} else {
navigate("/login")
}
};

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
toast.success("Note moved to archive!")
}
}
catch (error){
    toast.error("Can't move note to archive")
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
toast.success("Note dumped in trash!")
}
}
catch (error){
    toast.error("Can't dump note in trash")
console.log(error);
}
}




return(
<div className="App">
    <Navbar/>
    <div className="main-container">
        <Sidebar />
        <div className="right-cont-note">
            <div className="note-container" style={{backgroundColor : notes.backColor}}>
                <div className="note-head">
                    <input type="text" className="note-title" placeholder="Title" value={notes.title} onChange={(e)=>
                    setNote(() => ({
                    ...notes, title: e.target.value }))}/>
                </div>

                <textarea name="" className="note-text" cols="30" rows="10" placeholder="Write your note here..."
                    value={notes.mainContent}
                    onChange={(e)=> setNote(() => ({ ...notes, mainContent : e.target.value, currentDate : new Date().toLocaleString()}))}></textarea>

                <div className="note-foot">
                    <div className="t-and-p">
                    <select name="tags" className="drop-down" onClick={(e)=>setNote(()=>({...notes, tagName : e.target.value}))}>
                        <option selected disabled >Tags</option>
                        {tag.map((item)=> (
                        <option value={item} >{item}</option>))}
                    </select>
                    <select name="priority" className="drop-down" onClick={(e)=>setNote(()=>({...notes, priorityLevel :
                        e.target.value}))}>
                        <option selected disabled >Priority</option>
                        {priority.map((item)=> (
                        <option value={item}>{item}</option>))}
                    </select>
                    </div>
                    <div className="foot-icons">
                        <button className="button read-btn" onClick={noteCreateFuntion}><i

                                class="fal fa-plus icon-note"></i></button>
                        <input type="color" id="color-btn" value={notes.backColor} onChange={(e)=> setNote(() => ({...notes,
                        backColor : e.target.value}))} />

                    </div>
                </div>
            </div>
            {filteredNotes(note, filterState).map((item)=> (
            <div className="note-list" style={{backgroundColor : item.backColor}}>
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
                    <small className="date-time">{item.currentDate}</small>
                    <div className="foot-icons">
                        <span onClick={()=>moveToArchive(item)}><i class="fad fa-inbox-in note-list-icon"></i></span>
                        <span onClick={()=>moveToTrash(item)}><i class="fad fa-trash note-list-icon"></i></span>
                        <span onClick={()=>editHandler(item)}><i class="fad fa-pen note-list-icon"></i></span>
                    </div>
                </div>
            </div>
            ))}

{
                addModal && (
                    <Modal isOpen={addModal} style={customStyle}>
                        <header className="modal-head">
                            <p className="head">New Task</p>
                            <span  className = "cancel" onClick={() => setAddModal(false)}><i className="far fa-times"></i></span>
                        </header>
                        <main>
                            <label htmlFor="task" className="label">
                                Title
                            </label>
                            <input type="text" className="modal-inp input" value={newNote.title} autoFocus onChange={(e) =>setNewNote({ ...newNote, title: e.target.value })}
                            required/>

                            <label htmlFor="desc" className="label">
                                Description
                            </label>
                            <textarea type="text" cols="20" rows="5" className="modal-inp input" value={newNote.mainContent} 
                            onChange={(e) =>setNewNote({ ...newNote, mainContent: e.target.value, currentDate : new Date().toLocaleString() })}
                            required></textarea>
                            <div className="edit-modal-foot">
                        <select name="tags" id="" onClick={(e)=>setNewNote(()=>({...newNote, tagName : e.target.value}))}>
                        <option selected disabled>Tags</option>
                        {tag.map((item)=> (
                        <option value={item}>{item}</option>))}
                    </select>
                    <select name="priority" id="" onClick={(e)=>setNewNote(()=>({...newNote, priorityLevel :
                        e.target.value}))}>
                        <option selected disabled>Priority</option>
                        {priority.map((item)=> (
                        <option value={item}>{item}</option>))}
                    </select>
                    <input type="color" id="x" value={newNote.backColor} onChange={(e)=> setNewNote(() => ({...newNote,
                        backColor : e.target.value}))} />

                        </div>
                            <button className="btn secondary-btn" onClick={()=>editNote(token, newNote, currentNote, noteDispatch)}>Add Task</button> 
                        </main>
                    </Modal>
                )
            }
        </div>
        <Filter />
    </div>

</div>
);

}
export { Note };