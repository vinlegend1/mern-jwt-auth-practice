import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../services/authService';
import { AuthContext } from '../context/authContext';

const Navbar = (props) => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
            
        })
    }

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        )
    }

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/todos">
                    <li className="nav-item nav-link">Todos</li>
                </Link>
                {
                    user.role === "admin" ? <Link to="/admin">
                    <li className="nav-item nav-link">Admin</li>
                </Link> : null
                }
                <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/"><div className="navbar-brand" href="#">Navbar w/ text</div></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar() }
                </ul>
                <span className="navbar-text">
                Navbar text with an inline element
                </span>
            </div>
        </nav>
    )
}

export default Navbar;
