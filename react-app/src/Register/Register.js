import React, { useState } from 'react'

async function createUser(credentials) {
    return fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.ok ? response.json() : undefined)
        .catch(error => undefined)
}

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createUser({
            email,
            password,
            fullname
        });

        if (response === undefined)
            setError(true);
        else {
            setEmail("")
            setPassword("")
            setFullname("")
        }
    }

    return (
        <div className="column is-4 is-offset-4">
            <h3 className="title">Зарегистрировать пользователя</h3>
            <div className="box">
                {
                    error
                        ? <div className="notification is-danger is-light">Не получилось зарегистрировать.</div>
                        : null
                }
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="email" name="email" placeholder="Email"
                                onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" name="fullname" placeholder="Полное имя"
                                onChange={e => setFullname(e.target.value)} value={fullname} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="password" name="password" placeholder="Пароль"
                                onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>

                    <button className="button is-block is-primary is-fullwidth">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Register