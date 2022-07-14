import "./homepage.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/theme-context";

const Homepage = () =>{
    const { theme, setTheme } = useTheme();
return(
<div className="App">
<nav className="main-nav">
  <Link to="/" className="link-style link-color-primary">
  <h2 className="brand-name">Dot Notes</h2>
  </Link>
  { theme === "light" ? (
  <button className="theme-btn" onClick={()=> setTheme("dark")}><i class="fas fa-moon"></i></button> ) : 
  ( <button className="theme-btn" onClick={()=> setTheme("light")}><i class="fas fa-sun"></i></button> )}
</nav>

    <div className="body-div">
    <div className="image-side">
            {theme === "dark" ? (
            <img src="./extra5.svg" alt="hero-img" className="home-img" /> ) : ( 
            <img src="./hero-img.png" alt="hero-img" className="home-light-img" /> 
            ) }
        </div>
        <div className="content-side">
            <h1 className="home-brand">DOT NOTE</h1>
            <section className="home-content">
                <p className="home-para">Handle your routine, special tasks, ideas and to-do list with <span
                        className="br-name">Dot Note</span> for efficiency and give a better structure to your day...
                </p>
                <div className="btn-div">
                    <Link to="/signup">
                    <button className="btn primary-btn">Join Now</button>
                    </Link>
                    <Link to="/login">
                    <button className="new-btn read-btn">Already have an account?</button>
                    </Link>
                </div>
            </section>
        </div>
        
    </div>
</div>
);
}

export {Homepage};