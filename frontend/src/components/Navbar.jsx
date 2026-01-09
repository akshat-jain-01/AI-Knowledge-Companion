import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {user,token, settoken, logout} = useContext(AppContext)

  return (
    <nav className='w-full h-20 bg-amber-100 justify-between drop-shadow-sm space-x-10 flex'>
        <span className='text-black text-shadow-black text-4xl p-5'>AI Knowledge </span>
        <div className='m-4 rounded-full border-black border-2 w-md bg-white px-4 py-2'>
        <input type="text" placeholder="Search documents, notes, chats..." className='w-full outline-none text-gray-700 placeholder-gray-400' />
        </div>
        <div className='flex text-black text-shadow-black text-xl space-x-3.5 p-5'>
          <span className='cursor-pointer'>Home</span>
          <span className='cursor-pointer'>About Us</span>
          <div className='bg-white border-black border drop-shadow-sm rounded-lg'>
          <span onClick={logout} className='cursor-pointer p-2 py-1'>Log out</span>
          </div>
        </div>
    </nav>
  )
}

export default Navbar