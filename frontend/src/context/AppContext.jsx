import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const [showlogin, setshowlogin] = useState(false)
    const [user, setuser]  = useState(null)
    const[token, settoken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const logout = () =>{
        localStorage.removeItem('token')
        settoken('')
        setuser(null)
    }

    const value = {
        user,
        setuser, 
        token,
        settoken, 
        showlogin,
        setshowlogin,
        logout,
        navigate,
        backendurl
    }

    return(
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider




