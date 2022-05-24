import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout({ logout }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <button className="button is-danger" onClick={handleLogout}>Выйти</button>
    )
}

export default Logout