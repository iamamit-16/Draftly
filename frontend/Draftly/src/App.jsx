import React from 'react'
import {Routes,Route} from "react-router"
import HomePages from './pages/HomePages'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#3b82f6_100%)]"/>
    <Toaster position="top-right" />
    
      <Routes>
      <Route path ="/" element ={<HomePages/>}/>
      <Route path="/create" element = {<CreatePage/>}/>
      <Route path="/note/:id" element = {<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App