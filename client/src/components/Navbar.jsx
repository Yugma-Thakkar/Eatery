import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        // made a navbar
        <div>
            <nav className="navbar navbar-expand-lg py-3" style={{backgroundColor: "#e3f2fd"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand mx-3" to="/">Eatery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                
                <ul>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle mx-5" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Order Now
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                            <li><Link className="dropdown-item" to="/register">Register</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;