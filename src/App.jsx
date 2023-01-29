import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, useLocation } from "react-router-dom"
import { RequireAuth } from 'react-auth-kit'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';

function App() {
  const location = useLocation()

  return (
    <>
      {
        (location.pathname !== "/login" && location.pathname !== "/register") && <Header />
      }
      <Routes>
        <Route path="/" element={
          <RequireAuth loginPath="/login">
            <Home />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
