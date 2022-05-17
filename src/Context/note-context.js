import {
  createContext,
  useContext,
  useReducer
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
      case "DELETE_FROM_TRASH" : 
        return {
          ...noteState,
          trash : noteState.trash.filter((item)=>item._id !== payload)
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

  return ( <NoteContext.Provider value = {
      {
        noteState,
        noteDispatch
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