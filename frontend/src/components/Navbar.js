import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import CssNavbar from "../styles/navbar.css";

const Navbar = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location = '/login'
        alert('vous êtes deconnecter');
    }
    {
        return (
            <nav id='nav-header'>
                <div className='nav-container'>
                    <div className='logo-container'>
                        <NavLink  to='/'>
                            <div className='logo'>
                                <img src='../../img/groupo-monochrome-orange.png' alt='logo-site' className='orange-groupo-nav'>
                                </img>
                            </div>
                        </NavLink>
                    </div>
                    <div className='orange-line-container'>
                        {/* <h5>welcome to valeur dynamique''</h5> */}
                        <div className='orange-line'>
                        </div>
                    </div>
                    <div className='login-nav'>
                        <ul>
                            <li className='nav-login  redirect'>
                                <NavLink to='/login'>
                                    <div className='nav-main' title='login'>
                                        <i className="fa-solid fa-right-to-bracket">
                                        </i>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                        {/*if user authentified else redirect to login */}
                        <ul>
                            <li className='nav-profil  redirect'>
                                <NavLink to='/profil'>
                                    <div className='nav-user'
                                        title='profil'>
                                        <i className="fa-solid fa-user">
                                        </i>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                        {/*if user authentified  else redirect to login*/}
                        <ul>
                            <li className='nav-home  redirect'>
                                <NavLink  to='/'>
                                    <div className='nav-home'
                                        title='home'>
                                        <i className="fa-solid fa-house">
                                        </i>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                        {/*si user authentifier afficher la div logout dans la nav*/}
                        {token ? (
                            <ul>
                                <li className='nav-logout  redirect'>
                                    <NavLink to='/login'>
                                        <div className='nav-logout'
                                            title='logout'
                                            onClick={logout}>
                                            <i className="fa-solid fa-door-closed">
                                            </i>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>) : ({/*si user pas authentifier masquer la div logout dans la nav*/ },
                                <ul>
                                    <li className='nav-logout  redirect'>
                                        <NavLink to='/login'>
                                            <div className='nav-logout'
                                                style={{ display: 'none' }}>
                                                <i className="fa-solid fa-door-closed">
                                                </i>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;