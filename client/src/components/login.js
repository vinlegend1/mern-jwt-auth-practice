import React, { useState, useContext } from 'react';
import AuthService from '../services/authService';
import Message from './message';
import { AuthContext } from '../context/authContext';

const Login = (props) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
        // console.log(user);
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, msgBody } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            } else {
                setMessage(msgBody);
            }
        })
    }

    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Sign in</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" onChange={onChange} name="username" className="form-control" placeholder="Enter username..." />
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" onChange={onChange} name="password" className="form-control" placeholder="Enter password..." />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
            </form>
            {message ? <Message message={message}></Message> : null}
        </div>
    )
}

export default Login;