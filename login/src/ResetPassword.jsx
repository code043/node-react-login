import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function ResetPassword(props) {
  const navigate = useNavigate();
    const {id, token} = useParams()
 
  const [values, setValues] = useState({
    password: ''
  });
  
  axios.defaults.withCredentials = true
 
  
    const handleSubmit = (event) => {
      //console.log("Ok")
      event.preventDefault();
      
     // console.log(values)
      axios.post(`http://localhost:8081/reset-password/${id}/${token}/`, values)
        .then(res => {
          
          console.log(id, token)
          if (res.data.status === 200) {
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
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" name="password"
              onChange={e => setValues({ ...values, password: e.target.value })} />

          </div>
          
          <button type='submit'>Update</button>
          
        </form>
      </div>
    </>
  )
}
export default ResetPassword;