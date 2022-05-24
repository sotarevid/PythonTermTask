import React, { useState } from 'react'
import { getUserId } from '../GuestGuard/GuestGuard';
import getDayOffTypes from '../Utils/getDayOffTypes';

async function sendData(data) {
    return fetch('http://localhost:5000/api/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.ok ? response.json() : undefined)
        .catch(error => undefined)
}

function Profile() {
    const [error, setError] = useState(false);
    const [start, setStart] = useState(new Date().toISOString().substring(0, 10));
    const [end, setEnd] = useState(new Date().toISOString().substring(0, 10));
    const [type, setType] = useState("Б");
    const [types, setTypes] = useState(getDayOffTypes().slice(0, 5));

    const handleSubmit = async e => {
        e.preventDefault();
        const response = sendData({
            start: start,
            end: end,
            type: type,
            user_id: getUserId()
        })

        if (response === undefined)
            setError(true);
        else {
            setStart(new Date().toISOString().substring(0, 10));
            setEnd(new Date().toISOString().substring(0, 10));
            setType("Sick");
        }
    }

    const handleSelect = (e) => {
        e.preventDefault();
        if (e.target.value === "more") {
            setTypes(getDayOffTypes());
        }
        else {
            setType(e.target.value);
        }
    }

    return (
        <div className="column is-6 is-offset-3">
            <h3 className="title">Заполнить информацию</h3>
            <div className="box">
                {
                    error
                        ? <div className="notification is-danger is-light">Не получилось отправить данные.</div>
                        : null
                }
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Начало периода</label>
                        <div className="control">
                            <input className="input" type="date" name="start-date"
                                onChange={e => setStart(e.target.value)} value={start} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Конец периода</label>
                        <div className="control">
                            <input className="input" type="date" name="end-date"
                                onChange={e => setEnd(e.target.value)} value={end} />
                        </div>
                    </div>

                    <br />

                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select autoComplete='on' value={type} onChange={handleSelect}>
                                    {
                                        types.map(dayOffType =>
                                            <option key={dayOffType.type} value={dayOffType.type}>{dayOffType.text}</option>
                                        )
                                    }
                                    {
                                        types.length === 5
                                            ? <option value="more">Показать все</option>
                                            : null
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <button className="button is-block is-primary is-fullwidth">Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default Profile