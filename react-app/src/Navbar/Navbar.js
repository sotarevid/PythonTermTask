import React from 'react'
import { Link, } from 'react-router-dom';
import { getUserRole } from '../GuestGuard/GuestGuard';
import Logout from '../GuestGuard/Logout';


function Navbar({ logout }) {
    return (
        <div className="hero-head">
            <nav className="navbar">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/profile" className="button">Профиль</Link>
                            {
                                getUserRole() === "Exporter"
                                    ? <Link to="/export" className="button">Выгрузка</Link>
                                    : null
                            }
                            {
                                getUserRole() === "Admin"
                                    ? <Link to="/register" className="button">Регистрация</Link>
                                    : null
                            }

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