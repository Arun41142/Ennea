import React,{useContext} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TextCard from './components/TextCard'
import InputArea from './components/InputArea'
import { NotesProvider } from './components/NotesContext'
import CardsList from './components/CardsList'

function createTextCard(card){
  return(<TextCard
  key={card.key}
  title={card.title}
  desc={card.content}
/>);
}

const App = () => {

  return (
    <NotesProvider>
      <div>
        <Navbar/>
        <InputArea/>
        <CardsList />
        <Footer/>
      </div>
    </NotesProvider>
  )
}

export default App
