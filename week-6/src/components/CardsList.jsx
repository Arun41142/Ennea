import React,{useState,useContext} from 'react'
import { NotesContext } from './NotesContext';
import TextCard from './TextCard';


const CardsList = () => {
   const { notes, setNotes } = useContext(NotesContext);
  return (
    <div className='cards'>
        {notes.length === 0 ? <TextCard 
            title="Title"
            desc="Content"
        /> : notes.map((note,index)=>{
            return <TextCard 
                key={index}
                title={note.title}
                desc={note.content}
                index={index}
            />
        })}
        
        
    </div>
  )
}

export default CardsList