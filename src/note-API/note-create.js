import axios from "axios";
import toast from "react-hot-toast";

const noteCreate = async (note, token, noteDispatch) => {
    try {
        const result = await axios.post(
            "/api/notes", {
                note: note
            }, {
                headers: {
                    authorization: token
                }
            }
        );

        if (result.status === 200 || result.status === 201) {
            localStorage.setItem("note", JSON.stringify(result.data.notes));
            noteDispatch({
                type: "ADD_NOTE",
                payload: result.data.notes
            });
            toast.success("New note created!")
        } else throw new Error();
    } catch (error) {
        toast.error("Can't create new note!")
        console.log(error);
    }
};

const editNote = async (token, newNote, note, noteDispatch) =>{
    try{
        const response = await axios({
            url : `api/notes/${note._id}`,
            method : "post",
            data : { note : newNote },
            headers : { authorization : token}
        })
        if(response.status === 200 || response.status === 201 ){
            noteDispatch({
                type: "ADD_NOTE",
                payload: response.data.notes
            }); 
            toast.success("Note edited!")             
        }
        
    }
    catch(error){
        toast.error("Can't edit note!")
        console.log(error)
    }
}

export {
    noteCreate, 
    editNote,
}
