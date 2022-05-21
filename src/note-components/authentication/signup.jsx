import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { signUpAPI } from "../../note-API/auth-api";
import { useAuth } from "../../Context/authorization-context";
import { useState } from "react";


const Signup = () =>{
const { authState, authDispatch } = useAuth();
const navigate = useNavigate();
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

navigate("/notes");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
}
} else alert("Enter all the fields");
};

return (
<div className="App">
  <main class="form-main align-justify-center margin-30">
    <div class="form-container align-justify-center">
      <form action="" class="signup-form">
        <h2 class="form-head">SignUp Form</h2>
        <label for="fname" class="label-inp">Firstname*</label>
        <input type="text" class="input" id="fname" placeholder="Billie" value={user.fname}
          onChange={newUserInfoHandler} required autofocus />
        <label for="lname" class="label-inp">Lastname</label>
        <input type="text" class="input" id="lname" placeholder="Jean" value={user.lname}
          onChange={newUserInfoHandler} />
        <label for="email" class="label-inp">Email address*</label>
        <input type="text" class="email-id-input input" id="email" placeholder="billiejean123@gmail.com"
          value={user.email} onChange={newUserInfoHandler} required />
        <label for="password" class="label-inp">Password*</label>
        <input type="password" class="input" id="password" placeholder="***" value={user.password}
          onChange={newUserInfoHandler} required />
        <label for="">
          <input type="checkbox" id="t-c" required />
          I accept all the terms and conditions.
        </label>
        <div>
          <button class="submit-btn btn primary-btn" onClick={signupHandler}>Signup</button>
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