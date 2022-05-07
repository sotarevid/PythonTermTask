import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'

function ExportData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (loading) {
            fetch('http://localhost:5000/api/get_users', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(setLoading(false))
                .then(res => res ? setUsers(res) : setUsers([]))
        }
    }, [loading]);


    if (loading)
        return <h1>Loading...</h1>

    function handleSelect(e) {
        if (e.target.checked)
            setSelected([...selected, e.target.id])
        else
            setSelected(selected.filter(x => x !== e.target.id))
    }

    async function handlePost(e) {
        e.preventDefault();

        fetch('http://localhost:5000/api/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selected)
        })
            .then(res => res.blob())
            .then(blob => saveAs(blob, Date.now().toString()))
    }

    return (
        <div className="column is-6 is-offset-3">
            <h3 className="title">ExportData</h3>
            <div className="box">
                <input className="input" type="text" placeholder="Поиск"
                    onChange={e => setPrefix(e.target.value)} />

                <table className="table is-striped is-fullwidth">
                    <tbody>
                        {users.filter(e => e["name"].startsWith(prefix)).map(e =>
                            <tr key={e["id"]}>
                                <td>{e["name"]}</td>
                                <td><input id={e["id"]} type="checkbox" onChange={handleSelect}></input></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button className="button is-block is-primary is-fullwidth" onClick={handlePost}>Сформировать</button>
            </div>
        </div>
    )
}

export default ExportData