import axios from "axios";
import { useAuth } from "../Context/authorization-context";

const getAllNotes = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method : "get",
            url :  `api/notes`,
            headers : { authorization : token}
        })
        if(response.status === 200 || response.status === 201 ){
            console.log("got notes")
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}

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
            localStorage.setItem("note", result.data.notes);
            // console.log(result.data.notes)
            noteDispatch({
                type: "ADD_NOTE",
                payload: result.data.notes
            });
        } else throw new Error();
    } catch (error) {
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
            console.log("Edit note response",response.data.notes)
            noteDispatch({
                type: "ADD_NOTE",
                payload: response.data.notes
            });           
        }
    }
    catch(error){
        console.log(error)
    }
}

export {
    noteCreate, 
    editNote,
    getAllNotes

};