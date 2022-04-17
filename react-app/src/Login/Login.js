import React, { useState } from 'react'

async function loginUser(credentials) {
    return fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.ok ? response.json() : undefined)
}

function Login({ setToken, setRemember }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);

    let remember = false;

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            email,
            password
        });

        if (response === undefined)
            setError(true);
        else {
            setRemember(remember);
            setToken(response["token"], remember);
        }
    }

    return (
        <div className="column is-4 is-offset-4">
            <h3 className="title">Вход в систему</h3>
            <div className="box">
                {
                    error
                        ? <div className="notification is-danger is-light">Не получилось войти.</div>
                        : null
                }
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="email" name="email" placeholder="Email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="password" name="password" placeholder="Пароль"
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="checkbox">
                            <input type="checkbox" name="remember" onChange={e => remember = !remember} />
                            {" Запомнить меня"}
                        </label>
                    </div>
                    <button className="button is-block is-primary is-fullwidth">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login