import React from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import authService  from '../../appwrite/auth'  
import { logout } from '../../store/authSlice'


function LogoutBtn() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            // navigate('/');
        })
    }
    return (
        <button className='px-4 py-2 border-b-2 text-white border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn