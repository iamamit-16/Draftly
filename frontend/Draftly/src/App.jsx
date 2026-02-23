import React from 'react'
import {Routes,Route , Navigate} from "react-router"
import HomePages from './pages/HomePages'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#3b82f6_100%)]"/>
    <Toaster position="top-right" />
    
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path ="/" element ={<ProtectedRoute><HomePages/></ProtectedRoute>}/>
      <Route path="/create" element = {<ProtectedRoute><CreatePage /></ProtectedRoute>}/>
      <Route path="/note/:id" element = {<ProtectedRoute><NoteDetailPage /></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App