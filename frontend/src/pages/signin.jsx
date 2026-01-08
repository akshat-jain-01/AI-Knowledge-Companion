import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Signin = () => {

  const [state, setstate] = useState('login')

  const {setuser, settoken, setshowlogin, backendurl} = useContext(AppContext)

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

const onsubmitHandler = async(e) =>{
  e.preventDefault()

  try{

    if(state === 'login'){
      const {data} = await axios.post(backendurl+'/api/auth/login', {email, password})

      if(data.success){
      settoken(data.token)
      setuser(data.user)
      localStorage.setItem('token', data.token)
    }
    else{
      alert("Error")
    }
    }
    
    else{

    const {data} = await axios.post(backendurl+'/api/auth/register', {name, email, password})

    if(data.success){
      settoken(data.token)
      setuser(data.user)
      localStorage.setItem('token', data.token)
    }
    else{
      alert("Error")
    }
  }
  }
  catch(error){
    alert(error.message)
  }
}

  return (
    <form action="" onSubmit={onsubmitHandler}>
    <div className="h-screen w-screen bg-green-50 flex items-center justify-center">
      <div className="bg-gray-200 border-2 w-[70%] max-w-md rounded-3xl shadow-lg p-8">
        
        <h1 className="text-4xl font-bold text-black text-center mb-8">
          {state === 'login' ? 'Login' : 'Sign Up'}
        </h1>

        <div className="flex flex-col gap-5">

          {state !== 'login' &&
          <input
            type="text"
            placeholder="Username"
            className="bg-white w-full py-3 border-2 border-black rounded-full px-5 text-lg"
            onChange={(e) => setname(e.target.value)}
          />}

          <input
            type="email"
            placeholder="Email"
            className="bg-white w-full py-3 border-2 border-black rounded-full px-5 text-lg"
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white w-full py-3 border-2 border-black rounded-full px-5 text-lg"
            onChange={(e) => setpassword(e.target.value)}
          />

          <button className="bg-blue-500 text-white w-full py-3 rounded-full text-xl font-semibold hover:bg-blue-600 transition">
            {state === 'login' ? 'login' : 'create account'}
          </button>

        </div>

        {state === 'login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() =>setstate('Signup')}>Sign up</span></p>
          :
        <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() =>setstate('login')}>Login</span></p>}

      </div>
    </div>
    </form>
  );
};

export default Signin;
