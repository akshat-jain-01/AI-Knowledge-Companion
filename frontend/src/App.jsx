import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import Login from './pages/Login'


const App = () => {
  return (
    <>
      <div className='flex'>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/signin' element = {<Signin/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
      </div>
      </>
  )
}

export default App