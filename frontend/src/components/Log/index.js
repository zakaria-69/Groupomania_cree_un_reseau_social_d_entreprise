import React, { useState } from 'react';
import profil from '../../styles/login.css';
import ConnectionForm from './ConnectionForm';
import LoginForm from './LoginForm';

const Log = () => {
    const [connexionFormModal, setConnexionFormModal] = useState(true);
    const [loginFormModal, setLoginFormModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setConnexionFormModal(false);
            setLoginFormModal(true);
        } else if (e.target.id === 'login') {
            setConnexionFormModal(true);
            setLoginFormModal(false);
        }
    };

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul className='switch_register_login'>
                    <li onClick={handleModals}
                        id="register"
                        className={loginFormModal ? 'active-btn' : null}>
                        S'inscrire
                    </li>
                    <li onClick={handleModals}
                        id="login"
                        className={connexionFormModal ? 'active-btn' : null}>
                        connexion
                    </li>
                    <div className='form-appear'>
                        {connexionFormModal && < LoginForm />}
                        {loginFormModal && <ConnectionForm />}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Log;