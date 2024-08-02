import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import LandingPage from './assets/Pages/LandingPage'
import LoginPage from './assets/Pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './assets/Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './assets/Pages/AccountPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route pathe='/' element={<Layout />}>
          <Route index element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account/:subpage?' element={<AccountPage/>}/>
          <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
