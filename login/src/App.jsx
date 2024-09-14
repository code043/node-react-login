import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Forgot from './Forgot'
import ResetPassword from './ResetPassword';

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot-password' element={<Forgot/>}></Route>
      <Route path='/reset-password/:id/:token' element={<ResetPassword/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
