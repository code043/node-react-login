import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault();  
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            console.log("Dados ",res.data)
            if(res.data.status === 200){
                navigate('/')
            }else{
                alert(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }

    return (
        <>
        <div className='form'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
            
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter email" name="email" 
                    onChange={e => setValues({...values, email: e.target.value})}/>
                    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter passoword" name="password"
                    onChange={e => setValues({...values, password: e.target.value})}
                    />

                </div>
                <button type='submit'>Login</button>
            </form>
            <p>Already have an Account
            <Link to="/register">Create Account</Link>
            </p>
            <Link to='/forgot-password'>Forgot Password</Link>           
            <p>
                <Link to="/register">Sign Up</Link>
            </p>
        </div>
        </>
    )
}

export default Login;