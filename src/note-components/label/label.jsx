import "./label.css";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Label = () =>{
const { tag, setTag } = useNote();
let newTag= "";

const tagCreationFunction = () =>{
if(newTag !== ""){
setTag([...tag, newTag])
newTag="";
console.log(newTag)
}
else {
setTag([...tag])
}
}

const deleteCreatedTag = (deletingTag) =>{
setTag(tag.filter((_, index)=>index!==deletingTag));
}
return (
<div className="App">
    <div className="main-container">
        <Sidebar />
        <div className="right-cont">
            <div className="main-chip-cont">
                <div className="chips-container marginned">
                    <h5>Labels on Notes</h5>
                    <ul className="margin">
                        { tag.map((item, index)=>(
                        <li class="list-item">{item}<span class="icon-cross"
                                onClick={()=>deleteCreatedTag(index)}><i class="fal fa-times-circle chip-icon"></i></span></li>
                        ))}
                        <li class="new-item user-input"><input type="text" className="input-fruit"
                                placeholder="New Favourite..." onChange={(e)=>newTag=e.target.value}/><span
                                onClick={tagCreationFunction}><i className="fal fa-plus chip-icon"></i></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
);
}

export { Label };