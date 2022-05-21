import "../notepage/note.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authorization-context";

const Sidebar = () =>{
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate("/")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authDispatch({ type: "LOGOUT" });
        }

    const activeLink = ({isActive}) =>({
        color : isActive ? "var(--primary-color)" : "var(--secondary-color)"
    })
return(
<div className="left-nav">
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
</div>
);
}

export { Sidebar };