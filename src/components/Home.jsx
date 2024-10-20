import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    axios.defaults.withCredentials = true
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            console.log(res.data.name)
            if(res.data.status === 200){
                setAuth(true)
                setName(res.data.name)
                navigate('/')
            }else{
                setAuth(false)
                setMessage(res.data.Error)
                //navigate('/login')
            }
        })
        .then(err => console.log(err))
    }, []);
    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            res;
            location.reload(true)
        }).catch(err => console.log(err))
    }
    return (
        <div>
            { auth ? 
            <div>
                <h3>You are authorized {name}</h3>
                <button onClick={handleDelete}>Logout</button>
                <p>
                    Não é sua conta? click<Link to="/login">aqui</Link>
                </p>
            </div> : 
            <div>
                <h3>{message}</h3>
                <h3 style={{color: 'red'}}>Login Now</h3>
                <Link to="/login">Login</Link>
            </div>
            }
        </div>
    )
}

export default Home;