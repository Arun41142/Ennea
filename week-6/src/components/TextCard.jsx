import React,{useContext} from "react";
import { NotesContext } from "./NotesContext";
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => (props.primary ? '#f5ba13' : '#fff')};
  color: ${props => (props.primary ? '#fff' : '#d83231')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d83231;
    color: #fff;
  }
`;


const TextCard=(props)=>{
    const { notes, setNotes } = useContext(NotesContext);
    console.log(notes);
    
    const deleteNote=()=>{
        setNotes((prevItems) => {
            return prevItems.filter((item, index) => index !== props.index); 
        });
    }
    return (
        <div className="card">
            <h3>{props.title}</h3>
            <p className="card-content">{props.desc}</p>
            <button className="delete" onClick={deleteNote}>DELETE</button>
        </div>
    );
}

export default TextCard;