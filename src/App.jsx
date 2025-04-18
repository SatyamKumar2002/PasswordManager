import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx/Navbar'
import Manager from './Components/Navbar.jsx/Manager'
import Footer from './Components/Navbar.jsx/Footer'

function App() {

  return (
    <div className='overflow-y-auto overflow-x-auto scrollbar-hide'>
    <Navbar/>
    <div className='min-h-screen bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"'>
    <Manager/>
    </div>
    <Footer/>  
    </div>
  )
}

export default App
