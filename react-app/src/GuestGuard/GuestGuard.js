import React from 'react'
import App from '../App';
import Login from '../Login/Login';
import useToken from './useToken';

function getUserId() {
    return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

function GuestGuard() {
    const [token, setToken, resetToken] = useToken();

    if (!token) {
        return (
            <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Login setToken={setToken} />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <App logout={resetToken} />
    )
}

export { GuestGuard, getUserId };