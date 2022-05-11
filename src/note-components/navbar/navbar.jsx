import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authorization-context";
import "./navbar.css";

const Navbar = () => {
const { authDispatch } = useAuth();
const navigate = useNavigate();

const logoutHandler = () =>{
navigate("/")
localStorage.removeItem("token");
localStorage.removeItem("user");
authDispatch({ type: "LOGOUT" });
}
return (

<nav className="main-nav">
  <Link to="/" className="link-style link-color-primary">
  <h2 className="brand-name">Dot Notes</h2>
  </Link>
  <div className="search">
    <input type="text" placeholder="Search notes" className="search-bar" />
  </div>
  <button className="btn" onClick={logoutHandler}>Logout</button>
  <div className="avatar-box">
    <img src="./avatar-image.jpg" alt="avatar" className="av-size" />
  </div>
</nav>
);
}

export {Navbar} ;