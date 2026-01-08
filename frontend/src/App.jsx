import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signin from './pages/signin'
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/signin' element = {<Signin/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
      </>
  )
}

export default App