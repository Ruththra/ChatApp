import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { Routes, Route, Navigate} from 'react-router-dom'
import {useAuthStore} from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import { RingLoader } from 'react-spinners'
import {Toaster} from 'react-hot-toast'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <RingLoader
        color="#0de5be"
        cssOverride={{}}
        loading
        size={80}
        speedMultiplier={1}
      />  
  </div>
  )

  return (
    <div className='text-500' data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage />: <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      
      <Toaster 
        position="top-right"
      />

    </div>
  )
}

export default App