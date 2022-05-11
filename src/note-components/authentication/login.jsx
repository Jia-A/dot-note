import { Navbar } from "../navbar/navbar";
import "./auth.css";
import { useAuth } from "../../Context/authorization-context";
import { useState } from "react";
import { loginAPI } from "../../note-API/auth-api";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
const [ user, setUser ] = useState({email : "", password : ""});
const { authState, authDispatch } = useAuth();
const navigate = useNavigate();

const guestUserInfo = {
email: "adarshbalika@gmail.com",
password: "adarshBalika123",
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

navigate("/notes");
} else if (result.status === 404) {
alert("Email not registered");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
}
} else alert("Enter both field");
};

return (
<div className="App">
  <Navbar />
  <main class="form-main align-justify-center margin-30">

    <div class="form-container align-justify-center">

      <form action="" class="login-form">
        <h2 class="form-head">Login Form</h2>
        <label for="email" class="label-inp">Email address*</label>
        <input type="text" class="email-id-input input" id="email" value={user.email}
          placeholder="adarshbalika@gmail.com" onChange={newInfoHandler} required />

        <label for="password" class="label-inp">Password*</label>
        <input type="password" class="input" id="password" placeholder="***" value={user.password}
          onChange={newInfoHandler} required />

        <div class="pass-rem">
          <label for="">
            <input type="checkbox" id="remem-me" />
            Remember me
          </label>
          <button class="button read-btn">Forgot your password?</button>
        </div>
        <div>
          <button class="submit-btn btn primary-btn" onClick={guestUserHandler}>Guest</button>
        </div>
        <div>
          <button class="submit-btn btn primary-btn" onClick={loginHandler}>Login</button>
        </div>
        <Link to="/signup" className="link-style link-color-primary">
        <button class="new-ac button read-btn"> Create new account </button>
        </Link>
      </form>
    </div>
  </main>
</div>
);
};

export { Login };