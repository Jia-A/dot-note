import "./homepage.css";
const Homepage = () =>{
    return(
        <div className="App">
            
            <div className="body-div">
                <div className="content-side">
                <h1 className="home-brand">DOT NOTE</h1>
                    <section className="home-content">
                        <p className="home-para">Handle your routine, special tasks, ideas and to-do list with <span className="br-name">Dot Note</span> for efficiency and give a better structure to your day...</p>
                        <div className="btn-div">
                            <button className="btn primary-btn">Join Now</button>
                            <button className="button read-btn">Already have an account?</button>
                        </div>
                    </section>
                </div>
                <div className="image-side">
                    <img src="./hero-img.png" alt="hero-img" className="home-img"/>
                </div>
            </div>
        </div>
    );
}

export {Homepage};
