import React, { useState } from 'react'
import App from '../App';
import Login from '../Login/Login';
import useToken from './useToken';

function GuestGuard() {
    const [token, setToken] = useToken();
    const [remember, setRemember] = useState(false);

    if (!token) {
        return (
            <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Login setToken={setToken} setRemember={setRemember} />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <App logout={() => setToken(undefined, remember)} />
    )
}

export default GuestGuard;