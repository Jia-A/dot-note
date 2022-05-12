import "../notepage/note.css";
import { Link } from "react-router-dom";

const Sidebar = () =>{
return(
<div className="left-nav">
    <ul className="left-list">
        <li className="left-item"><span><i class="fal fa-home"></i></span> Home</li>
        <li className="left-item"><span><i class="fal fa-tag"></i> </span> Lable</li>
        <Link to="/archive" className="link-style link-color-primary">
        <li className="left-item"><span><i class="fal fa-archive"></i></span> Archive</li>
        </Link>
        <Link to="/trash" className="link-style link-color-primary">
        <li className="left-item"><span><i class="fal fa-trash"></i></span> Trash</li>
        </Link>
        <li className="left-item"><span><i class="fal fa-user-alt"></i></span> Profile</li>
        <li className="left-item"><span><i class="fal fa-filter"></i></span> Filter</li>
    </ul>
</div>
);
}

export { Sidebar };