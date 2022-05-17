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
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState(1);
    const [role, setRole] = useState("User");
    const [error, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createUser({
            email,
            password,
            fullname,
            role,
            salary,
            position
        });

        if (response === undefined)
            setError(true);
        else {
            setEmail("");
            setPassword("");
            setFullname("");
            setRole("User");
            setPosition("");
            setSalary(1);
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
                            <input className="input" type="password" name="password" placeholder="Пароль"
                                onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={role} onChange={e => setRole(e.target.value)}>
                                    <option value="User">Пользователь</option>
                                    <option value="Exporter">Экспорт</option>
                                    <option value="Admin">Суперпользователь</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" name="fullname" placeholder="Полное имя"
                                onChange={e => setFullname(e.target.value)} value={fullname} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" name="position" placeholder="Должность"
                                onChange={e => setPosition(e.target.value)} value={position} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="number" name="salary_multiplier" min="0.5" max="2" step="0.5" placeholder="Ставка"
                                onChange={e => setSalary(e.target.value)} value={salary} />
                        </div>
                    </div>

                    <button className="button is-block is-primary is-fullwidth">Зарегистрировать</button>
                </form>
            </div>
        </div>
    )
}

export default Register