import React,{useState,useContext} from 'react'
import { NotesContext } from './NotesContext';


const InputArea = () => {
    const [noteContent,setNoteContent]=useState({
        title:"",
        content:""
    });
    const { notes, setNotes } = useContext(NotesContext);
    
    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
            setNoteContent((prevItem)=>({
                ...prevItem,
                [name]:value,
            }))
        
    }
    // console.log(noteContent);
    
    const handleClick=(event)=>{
        event.preventDefault();
        setNotes((prevNotes)=>{
            return [...prevNotes,noteContent];
        })
        setNoteContent({ title: "", content: "" });
    }

    // console.log(notes);
    
    return (
        <div className="area">
        <form action="">
            <input type="text"  onChange={handleChange} placeholder='Title' name="title" value={noteContent.title}/>
            <textarea name="content" id="" cols="40" onChange={handleChange} placeholder='Take a note...' value={noteContent.content}></textarea>
            <button className='add' onClick={handleClick}>Add</button>
        </form>
    </div>
  );
}

export default InputArea