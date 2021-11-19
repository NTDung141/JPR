import React from 'react';
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark header">
                <NavLink className="navbar-brand" to="/">JPR</NavLink>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/history">History</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;