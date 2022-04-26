import React from 'react'
import { Link } from 'react-router-dom'

function AccessDenied() {
    return (
        <div>
            <div className='level'>
                <p className='level-item has-text-primary' style={{ "fontSize": "250px" }}>
                    403
                </p>
                <p className='level-item is-overlay' style={{ "fontSize": "125px" }}>
                    Access Denied
                </p>
            </div>
            <Link to="/" className='button is-primary is-large'>На главную</Link>
        </div>
    )
}

export default AccessDenied