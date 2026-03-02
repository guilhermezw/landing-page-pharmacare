import { useState } from 'react'
import './App.css'
import Footer from '../src/components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Problema from './pages/Problema/Problema';
function App() {
  

  return (
    <div>
      <NavBar />
      <main className="container">
        <Routes>
    
          <Route path="/problema" element={<Problema />} />
          

       
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
