import React, { Component } from 'react';
import Log from '../components/Log';
import CssProfil from '../styles/login.css';

class Login extends Component {
    render() {
        return (
            <div className='profil-page'>
                <div className='log-container'>
                    <Log />
                </div>
            </div>
        );
    }
}

export default Login;