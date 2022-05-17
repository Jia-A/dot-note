import { useFilter } from "../../Context/filter-context";
import { useNote } from "../../Context/note-context";


const Filter = () =>{
const { noteState, tag } = useNote();
const { priority } = noteState;
const { filterState, filterDispatch } = useFilter();


return (
<div className="filter-container">
    <div className="filter-tag">
        <select name="tags" id="" onClick={(e)=>filterDispatch({type : "TAGS", payload : e.target.value})}>
            {tag.map((item)=>(
            <option value={item}>{item}</option>
            ))}
        </select>
    </div>
    <div className="filter-prio">
        <select name="priority" id="" onClick={(e)=>filterDispatch({type : "PRIORITY", payload : e.target.value})}>
            {priority.map((item)=>(
            <option value={item}>{item}</option>
            ))}
        </select>
    </div>
    <button className="btn" onClick={(e)=>filterDispatch({type : "CLEAR_FILTER", payload : {...filterState.allNotes}
        })}>Clear all filter</button>
</div>
);
}

export { Filter };