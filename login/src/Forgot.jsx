import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

 function Forgot() {
  const [values, setValues] = useState({
    email: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const handleSubmit = (event) => {
    console.log(values)
    navigate('/login')
    event.preventDefault();
    axios.post('http://localhost:8081/forgot-password', values)
      .then(res => {
        console.log("Dados ", res.data)
        if (true) {
          navigate('/login')
        } else {
          alert(res.data.Error)
        }
      })
      .then(err => console.log(err))
  }

  return (
    <>
      <div className='form'>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" name="email"
              onChange={e => setValues({ ...values, email: e.target.value })} />

          </div>
          
          <button type='submit'>Send</button>
          
        </form>
      </div>
    </>
  )
}
export default Forgot;