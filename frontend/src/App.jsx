import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signin from './pages/signin'
import Login from './pages/Login'
import SlideBar from './components/SlideBar'

const App = () => {
  return (
    <>
      <Navbar/>
      <div className='flex'>
        <SlideBar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/signin' element = {<Signin/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
      </div>
      </>
  )
}

export default App