import "./navbar.css";

const Navbar = () => {
return (

<nav className="main-nav">
  <h2 className="brand-name">Dot Notes</h2>
  <div className="search">
    <input type="text" placeholder="Search notes" className="search-bar" />
  </div>
  <button className="btn">Filter</button>
  <div className="avatar-box">
    <img src="./avatar-image.jpg" alt="avatar" className="av-size" />
  </div>
</nav>
);
}

export {Navbar} ;