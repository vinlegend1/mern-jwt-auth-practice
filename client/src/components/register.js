import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/authService';
import Message from './message';

const Login = (props) => {
    const [user, setUser] = useState({ username: "", password: "", role: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const resetForm = () => {
        setUser({ username: "", password: "", role: "" })
    }

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
        // console.log(user);
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            // console.log(data);
            const { msgErr, msgBody } = data;
            setMessage(message);
            resetForm();
            if (!msgErr) {
                timerID = setTimeout(() => {
                    props.history.push('/login')
                }, 2000);
            }
        })
    }

    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" onChange={onChange} value={user.username} name="username" className="form-control" placeholder="Enter username..." />
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" value={user.password} onChange={onChange} name="password" className="form-control" placeholder="Enter password..." />
                <label htmlFor="role" className="sr-only">Password: </label>
                <input type="text" value={user.role} onChange={onChange} name="role" className="form-control" placeholder="Enter role..." />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
            {message ? <Message message={message}></Message> : null}
        </div>
    )
}

export default Login;