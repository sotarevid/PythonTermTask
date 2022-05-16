import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'

function GetDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

function ExportData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [selected, setSelected] = useState([])
    const [month, setMonth] = useState(new Date().toISOString().substring(0, 7))

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
            setSelected([...selected, parseInt(e.target.id)])
        else
            setSelected(selected.filter(x => x !== parseInt(e.target.id)))
    }

    async function handlePost(e) {
        e.preventDefault();

        fetch('http://localhost:5000/api/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selected: selected, month: month })
        })
            .then(res => res.blob())
            .then(blob => saveAs(blob, "Табель " + GetDate()))
    }

    return (
        <div className="column is-6 is-offset-3">
            <h3 className="title">ExportData</h3>
            <div className="box">
                <div className="field">
                    <label className="label">Расчетный период</label>
                    <div className="control">
                        <input className="input" type="month" name="month"
                            onChange={e => setMonth(e.target.value)} value={month} />
                    </div>
                </div>

                <input className="input" type="text" placeholder="Поиск"
                    onChange={e => setPrefix(e.target.value)} />

                <table className="table is-striped is-fullwidth">
                    <tbody>
                        {users.filter(e => e["name"].startsWith(prefix)).map(e =>
                            <tr key={e["id"]}>
                                <td>{e["name"]}</td>
                                <td><input id={e["id"]} type="checkbox" onChange={handleSelect}
                                    checked={selected.includes(parseInt(e["id"]))}></input></td>
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