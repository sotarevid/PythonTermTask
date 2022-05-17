import React from 'react'
import { Link, } from 'react-router-dom';
import Logout from '../GuestGuard/Logout';


function Navbar({ logout }) {
    return (
        <div className="hero-head">
            <nav className="navbar">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/profile" className="button">Профиль</Link>
                            <Link to="/export" className="button">Выгрузка</Link>
                            <Link to="/register" className="button">Регистрация</Link>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Logout logout={logout} />
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar