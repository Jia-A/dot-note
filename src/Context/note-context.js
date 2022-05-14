import {
  createContext,
  useContext,
  useReducer, 
  useState
} from "react";

const NoteContext = createContext();

const noteReducer = (noteState, {
  type,
  payload
}) => {

  switch (type) {
    case "ADD_NOTE":
      return {
        ...noteState, note: payload
      };
    case "DELETE_NOTE":
      return {
        ...noteState,
        note: payload.note,
          trash: [...noteState.trash, {
            ...payload.trash
          }],
      }
      case "MOVE_TO_ARCHIVE":
        return {
          ...noteState,
          note: payload.note,
            archive: payload.archive,
        }
      case "DELETE_NOTE_FROM_ARCHIVE" : 
      return {
        ...noteState,
        archive : payload.archive,
        trash : [...noteState.trash, {
          ...payload.trash
        }],
      }
      case "RESTORE_ARCHIVED_NOTE" :
        return {
          ...noteState,
          archive : payload.archive,
          note : payload.note,
        }
        default:
          return noteState;
  }
};

const NoteProvider = ({
  children
}) => {
  const [noteState, noteDispatch] = useReducer(noteReducer, {
    note: [],
    trash: [],
    archive: []
  });
  const [notes, setNote] = useState({ title: "", mainContent: "", backColor : ""});


  return ( <NoteContext.Provider value = {
      {
        noteState,
        noteDispatch,
        notes,
        setNote
      }
    } > {
      children
    } </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);

export {
  NoteProvider,
  useNote
};