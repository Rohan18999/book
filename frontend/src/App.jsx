import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Addbook from './components/AddBook.jsx'
import Login from './components/Login'
import Signup from './components/SignUp.jsx'
import ViewBooks from './components/ViewBooks.jsx'


function App() {

  return (
    <>

      <Routes>
        <Route path='/books' element={<Addbook />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/viewbooks' element={<ViewBooks />}/>
      </Routes>
    </>
  )
}

export default App
