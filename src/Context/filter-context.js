import {
    createContext,
    useContext,
    useReducer
} from "react";
import {
    useNote
} from "./note-context";

const FilterContext = createContext();

const FilterProvider = ({
    children
}) => {
    const {
        noteState
    } = useNote();
    const {
        note
    } = noteState;


    const filterReducer = (filterState, action) => {
        switch (action.type) {
            case "TAGS":
                return {
                    ...filterState,
                    filterByTags: action.payload,
                }
                case "PRIORITY":
                    return {
                        ...filterState,
                        filterByPriority: action.payload,
                    }
                    case "CLEAR_FILTER":
                        return {
                            ...filterState,
                            filterByTags: "",
                                filterByPriority: "",
                                allNotes: filterState.allNotes,
                        }
                        default:
                            return filterState
        }
    }

    const [filterState, filterDispatch] = useReducer(filterReducer, {
        filterByTags: "",
        filterByPriority: "",
        allNotes: [...note],
    });


    const tagFilFunc = (note, filterOnTags) => {
        if (note !== [] || note !== "undefined") {
            const showNotes = [...note];
            if (filterOnTags != "") {
                const arr = showNotes.filter((item) =>
                    item.tagName === filterOnTags
                )
                return arr;
            }
            return showNotes;

        }
    }
    const prioFilFunc = (note, filterOnPriority) => {
        if (note !== [] || note !== "undefined") {
            const showNotes = [...note];
            if (filterOnPriority !== "") {
                const arr = showNotes.filter((item) =>
                    item.priorityLevel === filterOnPriority
                )
                return arr;
            }
            return showNotes;
        }
    }


    const filteredNotes = (note, filterState) => {
        const {
            filterByTags,
            filterByPriority
        } = filterState;
        const filterTag = tagFilFunc(note, filterByTags);
        const filterPriority = prioFilFunc(filterTag, filterByPriority);
        return filterPriority;
    };

    return ( <FilterContext.Provider value = {
            {
                filterState,
                filterDispatch,
                filteredNotes
            }
        } > {
            children
        } </FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext);

export {
    FilterProvider,
    useFilter
};