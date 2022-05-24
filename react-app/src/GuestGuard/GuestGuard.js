import React from 'react'
import App from '../App';
import Login from '../Login/Login';
import useStorage from './useStorage';

function getUserId() {
    return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

function getUserRole() {
    return localStorage.getItem("role") ?? sessionStorage.getItem("role");
}

function GuestGuard() {
    const [token, setToken, resetToken] = useStorage("token");
    const [role, setRole, resetRole] = useStorage("role");

    if (!token) {
        return (
            <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Login setToken={setToken} setRole={setRole} />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <App logout={() => { resetToken(); resetRole() }} />
    )
}

export { GuestGuard, getUserId, getUserRole };