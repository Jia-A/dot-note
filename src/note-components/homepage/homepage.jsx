import "./homepage.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/theme-context";

const Homepage = () =>{
    const { theme } = useTheme();
return(
<div className="App">

    <div className="body-div">
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
        <div className="image-side">
            {theme === "dark" ? (
            <img src="./extra5.svg" alt="hero-img" className="home-img" /> ) : ( 
            <img src="./hero-img.png" alt="hero-img" /> 
            ) }
        </div>
    </div>
</div>
);
}

export {Homepage};