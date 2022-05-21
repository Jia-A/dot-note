import "../notepage/note.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authorization-context";
// import { toast } from "react-toastify";
// import { Filter } from "../filter/filter";

const Sidebar = () =>{
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        // toast.success("Successfully Logged out.")
        navigate("/")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authDispatch({ type: "LOGOUT" });
        // toast.success("Successfully Logged out.")
        }

    const activeLink = ({isActive}) =>({
        // backgroundColor : isActive ? "#1D3461" : "",
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