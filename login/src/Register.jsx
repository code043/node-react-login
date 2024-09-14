import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            if(res.data.status === 200){
                navigate('/login')
            }else{
                alert("error")
            }
        })
        .then(err => console.log(err))
    }
    return (
        <>
        <div className="form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name" name="name"
                    onChange={e => setValues({...values, name: e.target.value})}
                    />

                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter email" name="email"
                    onChange={e => setValues({...values, email: e.target.value})}
                    />

                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter passoword" name="password"
                    onChange={e => setValues({...values, password: e.target.value})}
                    />

                </div>
                <button type='submit'>Sing Up</button>
                <p>You are agree to aour terms and policies</p>
                <Link to="/login">Login</Link>
            </form>
        </div>
        </>
    )
}

export default Register;