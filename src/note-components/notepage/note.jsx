import "./note.css";
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";

const Note = () =>{
    return(
        <div className="App">
            <Navbar/>
            <div className="main-container">
                <Sidebar/>
                <div className="right-cont">
                    <div className="note-container">
                        <div className="note-head">
                            <textarea name="" className="note-text" cols="30" rows="10" placeholder="Write your note here..."></textarea>
                            <span className="pin"><i class="fal fa-thumbtack"></i></span>
                        </div>
                        <div className="note-foot">
                            <div className="created-date
                            "><label htmlFor="">Created on  
                                <input type="date" name="" className="date-inp"/>
                            </label>
                                
                            </div>
                            <div className="foot-icons">
                                <span><i class="fal fa-palette"></i></span>
                                <span><i class="fal fa-tag"></i></span>
                                <span><i class="fal fa-archive"></i></span>
                                <span><i class="fal fa-trash"></i></span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="note-container">
                        <div className="note-head">
                            <input type="text" className="note-title" placeholder="Title"/>
                            <span className="pin"><i class="fal fa-thumbtack"></i></span>
                        </div>
                        
                        <textarea name="" className="title-note" cols="30" rows="10" placeholder="Write your note here..."></textarea>
                           
                        <div className="note-foot">
                            <div className="created-date
                            "><label htmlFor="">Created on  
                                <input type="date" name="" className="date-inp"/>
                            </label>
                            </div>
                            <div className="foot-icons">
                                <span><i class="fal fa-palette"></i></span>
                                <span><i class="fal fa-tag"></i></span>
                                <span><i class="fal fa-archive"></i></span>
                                <span><i class="fal fa-trash"></i></span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export {Note};