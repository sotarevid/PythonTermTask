import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import ExportData from './ExportData/ExportData';
import Navbar from './Navbar/Navbar';
import Logout from './GuestGuard/Logout';
import NotFound from './Errors/NotFound';
import Register from './Register/Register';

function App({ logout }) {
    return (
        <BrowserRouter>
            <section className="hero is-fullheight is-light">
                <Navbar logout={logout} />

                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Routes>
                            <Route exact path='/' element={<Home />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/export' element={<ExportData />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </section>
        </BrowserRouter>
    )
}

export default App