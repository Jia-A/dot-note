import { Link } from "react-router-dom";
import "./navbar.css";
import { useTheme } from "../../Context/theme-context";
const Navbar = () => {

const { theme, setTheme } = useTheme();

return (

<nav className="main-nav">
  <Link to="/" className="link-style link-color-primary">
  <h2 className="brand-name">Dot Notes</h2>
  </Link>
  {/* <div className="search">
    <input type="text" placeholder="Search notes" className="search-bar" />
  </div> */}
  {/* <div className="avatar-box">
    <img src="./avatar-image.jpg" alt="avatar" className="av-size" />
  </div> */}
  { theme === "light" ? (
  <button className="theme-btn" onClick={()=> setTheme("dark")}><i class="fas fa-moon"></i></button> ) : 
  ( <button className="theme-btn" onClick={()=> setTheme("light")}><i class="fas fa-sun"></i></button> )}
</nav>
);
}

export {Navbar} ;