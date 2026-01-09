import React from 'react'
import { useNavigate } from 'react-router-dom'

const SlideBar = () => {
    const navigate = useNavigate()
  return (
    <div className='h-[88.5vh] bg-amber-50 w-sm drop-shadow-sm flex flex-col space-y-5 text-center'>
        <h1 className='font-bold text-3xl justify-center items-center text-center p-6'>Select Task</h1>
        <div className='flex flex-col text-2xl space-y-5'>
        <span onClick = {() => navigate('/summary')} className='cursor-pointer'>summary</span>
        <span onClick = {() => navigate('/notes')} className='cursor-pointer'>Notes</span>
        <span onClick = {() => navigate('/chat')} className='cursor-pointer'>Chat</span>
        <span onClick = {() => navigate('/history')} className='cursor-pointer'>History</span>
        <span onClick = {() => navigate('/help')} className='cursor-pointer'>Help</span>
        </div>
    </div>
  )
}

export default SlideBar