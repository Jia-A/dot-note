import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { signUpAPI } from "../../note-API/auth-api";
import { useAuth } from "../../Context/authorization-context";
import { useState } from "react";
import { useTheme } from "../../Context/theme-context";
import toast from "react-hot-toast"


const Signup = () =>{
const { authState, authDispatch } = useAuth();
const navigate = useNavigate();
const { theme, setTheme } = useTheme();
const [user, setUser] = useState({
fname: "",
lname: "",
email: "",
password: "",
});

const newUserInfoHandler = (event) => {
const { id, value } = event.target;
setUser({ ...user, [id]: value });
};

const checkFilled = () => {
return user.fname !=="", user.lname !=="", user.email !== "", user.password !== ""
};

const signupHandler = async (event) => {
event.preventDefault();
if (checkFilled()) {
try {
const response = await signUpAPI(user);

if (response.status === 201) {
localStorage.setItem("token", response.data.encodedToken);
localStorage.setItem(
"user",
JSON.stringify(response.data.createdUser)
);

authDispatch({
type: "SIGNUP",
payload: {
user: response.data.createdUser,
token: response.data.encodedToken,
},
});
toast.success("Signup successful!")

navigate("/notes");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
  toast.error("Signup failed.")
console.log(error);
}
} else toast.error("Enter all the fields");
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
      <form action="" class="signup-form" onSubmit={signupHandler}>
        <h2 class="form-head">SignUp Form</h2>
        <label for="fname" class="label-inp">Firstname*</label>
        <input type="text" class="input" id="fname" placeholder="Billie" value={user.fname}
          onChange={newUserInfoHandler} required autofocus />
        <label for="lname" class="label-inp">Lastname</label>
        <input type="text" class="input" id="lname" placeholder="Jean" value={user.lname}
          onChange={newUserInfoHandler} />
        <label for="email" class="label-inp">Email address*</label>
        <input type="email" class="email-id-input input" id="email" placeholder="billiejean123@gmail.com"
          value={user.email} onChange={newUserInfoHandler} required />
        <label for="password" class="label-inp">Password*</label>
        <input type="password" class="input" id="password" placeholder="***" value={user.password}
          onChange={newUserInfoHandler} required />
        <label for="terms" className="terms">
          <input type="checkbox" id="t-c" required />
          I accept all the terms and conditions.
        </label>
        <div>
          <button class="submit-btn btn primary-btn" type="submit">Signup</button>
        </div>
        <Link to="/login" className="link-style link-color-primary">
        <button class="new-ac button read-btn"> Already have an account</button>
        </Link>
      </form>
    </div>
  </main>
</div>
);
};

export {Signup};