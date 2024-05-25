import { useState ,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import './App.css'
import authService from './appwrite/auth'

import { login, logout } from './store/authSlice'
import {Footer, Header} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const[loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))

  },[dispatch])

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, loading]);
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-100'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />

      </div>
    </div>
  ):null
}

export default App
