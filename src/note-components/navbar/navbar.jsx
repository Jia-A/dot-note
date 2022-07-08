import { Link, NavLink , useNavigate } from "react-router-dom";
import "./navbar.css";
import "../notepage/note.css"
import { useTheme } from "../../Context/theme-context";
import { useState } from "react";
import { useAuth } from "../../Context/authorization-context";
import { useNote } from "../../Context/note-context";
import { useFilter } from "../../Context/filter-context";

const Navbar = () => {

const { theme, setTheme } = useTheme();
const [ sidebar, setSidebar ] = useState(false);
const [ filter, setFilter ] = useState(false)

const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate("/")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authDispatch({ type: "LOGOUT" });
        }

        const { noteState, tag } = useNote();
        const { priority } = noteState;
        const { filterState, filterDispatch } = useFilter();

const activeLink = ({isActive}) =>({
  color : isActive ? "var(--primary-color)" : "var(--secondary-color)"
})

return (

<nav className="main-nav">
  <Link to="/" className="link-style link-color-primary">
  <h2 className="brand-name">Dot Notes</h2>
  </Link>
  <div className="nav-buttons">
  { theme === "light" ? (
  <button className="theme-btn" onClick={()=> setTheme("dark")}><i class="fas fa-moon"></i></button> ) : 
  ( <button className="theme-btn" onClick={()=> setTheme("light")}><i class="fas fa-sun"></i></button> )}
  <button className="theme-btn ham-hide" onClick={()=>setSidebar(true)}><i className="fas fa-bars"></i></button>
  <button className="theme-btn ham-hide" onClick={()=>setFilter(true)}><i className="fas fa-filter"></i></button>
  </div>
    {sidebar &&
    <div className="up-sidebar hidden">
      <p><i className="fas fa-times" onClick={()=>setSidebar(false)}></i></p>
      <ul className="left-list">
        <NavLink to="/notes" className="link-style link-color-primary" style={activeLink}>
        <li className="left-item"><span><i class="fal fa-home ic"></i></span> Home</li>
        </NavLink>
        <NavLink to="/label" className="link-style link-color-primary" style={activeLink}>
        <li className="left-item"><span><i class="fal fa-tag ic"></i> </span> Lable</li>
        </NavLink>
        <NavLink to="/archive" className="link-style link-color-primary" style={activeLink}>
        <li className="left-item"><span><i class="fal fa-archive ic"></i></span> Archive</li>
        </NavLink>
        <NavLink to="/trash" className="link-style link-color-primary" style={activeLink}>
        <li className="left-item"><span><i class="fal fa-trash ic"></i></span> Trash</li>
        </NavLink>
        <button className="btn">
        <li onClick={logoutHandler}>Logout</li></button>
    </ul>
    </div>}

    {filter && 
    <div className="filter-box hidden">
      <p><i className="fas fa-times" onClick={()=>setFilter(false)}></i></p>
      <h2 className="filter-head">Filter</h2>
    <label htmlFor="" className="sort-label">Sort by Tags</label>
    {tag.map((item)=> (
    <label>
        <input className="fil-inp" type="radio" name="tag" value={item} onClick={(e)=>filterDispatch({type : "TAGS",
        payload : e.target.value})}/>{item} </label>

    ))}

    <label htmlFor="" className="sort-label">Sort by Priority</label>
    {priority.map((item)=> (
    <label>
        <input className="fil-inp" type="radio" value={item} name="priority" onClick={(e)=>filterDispatch({type :
        "PRIORITY", payload : e.target.value})}/>{item} </label>

    ))}
    <button className="btn" onClick={(e)=>filterDispatch({type : "CLEAR_FILTER", payload : {...filterState.allNotes}
        })}>Clear all filter</button>
    </div> }
  
</nav>
);
}

export {Navbar} ;