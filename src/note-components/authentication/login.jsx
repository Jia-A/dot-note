import "./auth.css";
import { useAuth } from "../../Context/authorization-context";
import { useState } from "react";
import { loginAPI } from "../../note-API/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/theme-context";
import toast from "react-hot-toast";


const Login = () => {
const [ user, setUser ] = useState({email : "", password : ""});
const { authState, authDispatch } = useAuth();
const { theme, setTheme } = useTheme();
const navigate = useNavigate();

const guestUserInfo = {
  email: "billiejean2011@gmail.com",
  password: "smoothcriminal",
};

const newInfoHandler = (event) => {
const { id, value } = event.target;
setUser({ ...user, [id]: value });
};

const guestUserHandler = (event) => {
event.preventDefault();
setUser(guestUserInfo);
};

const loginHandler = async (event) => {
event.preventDefault();
if ((user.email !== "", user.password !== "")) {
try {
const result = await loginAPI(user);
if (result.status === 200) {
localStorage.setItem("token", result.data.encodedToken);
localStorage.setItem("user", JSON.stringify(result.data.foundUser));

authDispatch({
type: "LOGIN",
payload: {
user: result.data.foundUser,
token: result.data.encodedToken,
},
});
toast.success("Login successful")
navigate("/notes");

} else if (result.status === 404) {
toast.error("Email not registered.")
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
toast.error("Login failed!")
}
} else toast.error("Enter both field");
};

return (
<div className="App">
<nav className="main-nav">
  <Link to="/" className="link-style link-color-primary">
  <h2 className="brand-name">Dot Notes</h2>
  </Link>
  { theme === "light" ? (
  <button className="theme-btn" onClick={()=> setTheme("dark")}><i class="fas fa-moon"></i></button> ) : 
  ( <button className="theme-btn" onClick={()=> setTheme("light")}><i class="fas fa-sun"></i></button> )}
</nav>
  <main class="form-main align-justify-center margin-30">
    <div class="form-container align-justify-center">
      <form action="" class="login-form" onSubmit={loginHandler}>
        <h2 class="form-head">Login Form</h2>
        <label for="email" class="label-inp">Email address*</label>
        <input type="email" class="email-id-input input" id="email" value={user.email}
          placeholder="billiejean2011@gmail.com" onChange={newInfoHandler} required />

        <label for="password" class="label-inp">Password*</label>
        <input type="password" class="input" id="password" placeholder="**************" value={user.password}
          onChange={newInfoHandler} required />

        {/* <div class="pass-rem">
          <label for="">
            <input type="checkbox" id="remem-me" required/>
            Remember me
          </label>
          <button class="new-ac">Forgot your password?</button>
        </div> */}
        <div className="login-btns">
          <button class="submit-btn btn primary-btn" onClick={guestUserHandler}>Guest Credentials</button>
        </div>
        <div>
          <button class="submit-btn btn primary-btn" type="submit">Login</button>
        </div>
        <Link to="/signup" className="link-style link-color-primary">
        <button class="new-ac"> Create new account </button>
        </Link>
      </form>
    </div>
  </main>
</div>
);
};

export { Login };