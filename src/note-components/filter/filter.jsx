import { useFilter } from "../../Context/filter-context";
import { useNote } from "../../Context/note-context";


const Filter = () =>{
const { noteState, tag } = useNote();
const { priority } = noteState;
const { filterState, filterDispatch } = useFilter();


return (
<div className="filter-container">
    <h2 className="filter-head">Filter</h2>
    <label htmlFor="" className="sort-label">Sort by Tags</label>
    {tag.map((item)=> (
    <label>
        <input className="fil-inp" type="radio" name="tag" checked={filterState.filterByTags=== item} value={item} onClick={(e)=>filterDispatch({type : "TAGS",
        payload : e.target.value})}/>{item} </label>

    ))}

    <label htmlFor="" className="sort-label">Sort by Priority</label>
    {priority.map((item)=> (
    <label>
        <input className="fil-inp" type="radio" checked={filterState.filterByPriority=== item} value={item} name="priority" onClick={(e)=>filterDispatch({type :
        "PRIORITY", payload : e.target.value})}/>{item} </label>

    ))}
    <button className="btn" onClick={(e)=>filterDispatch({type : "CLEAR_FILTER", payload : {...filterState.allNotes}
        })}>Clear all filter</button>
</div>
);
}




export { Filter };