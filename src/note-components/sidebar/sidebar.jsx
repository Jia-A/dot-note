import "../notepage/note.css";

const Sidebar = () =>{
    return(
            <div className="left-nav">
                      <ul className="left-list">
                          <li className="left-item"><span><i class="fal fa-home"></i></span>   Home</li>
                          <li className="left-item"><span><i class="fal fa-tag"></i> </span>  Lable</li>
                          <li className="left-item"><span><i class="fal fa-archive"></i></span>    Archive</li>
                          <li className="left-item"><span><i class="fal fa-trash"></i></span>   Trash</li>
                          <li className="left-item"><span><i class="fal fa-user-alt"></i></span>   Profile</li>
                      </ul>  
                </div>
    );
}

export { Sidebar };