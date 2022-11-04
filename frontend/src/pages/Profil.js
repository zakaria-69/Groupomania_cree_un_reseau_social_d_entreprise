import React from 'react';
import ProfilPages from '../components/ProfilPages.js';

const Profil = () => {
    const token = localStorage.getItem('token');

    return (
        <div className='profil-container'>
            {token ? (
                <ProfilPages />
            ) : (
                alert('veuillez vous connecter pour acceder à cette page'),
                window.location = '/login'
            )}</div>
    )
}

export default Profil;