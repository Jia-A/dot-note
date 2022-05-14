import "./label.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Label = () =>{
    const { tag, setTag } = useNote();
    var newTag= " ";

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

 return (
    <div className="App">
        <Navbar/>
        <div className="main-container">
            <Sidebar/>
            <div className="right-cont">
                <div className="main-chip-cont">
            <div className="chips-container marginned">
                <h5>Favourite fruits</h5>
                <ul className="margin">
                    { tag.map((item)=>(
                    <li class="list-item input">{item}<span class="icon-cross"><i class="fal fa-times-circle"></i></span></li> 
                    ))} 
                    <li class="new-item input user-input"><input type="text" className="input-fruit" placeholder="New Favourite..." onChange={(e)=>newTag=e.target.value}/><span onClick={tagCreationFunction}><i className="fal fa-plus"></i></span></li>
                </ul>    
            </div>
            </div>
            </div>
        </div>
    </div>
 );
}

export { Label };