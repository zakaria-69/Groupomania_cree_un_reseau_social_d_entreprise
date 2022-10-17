import React, { Component, useState } from 'react';
import UpdateProfil from './UpdateProfil';
import DeleteProfil from './DeleteProfil';
import CurrentProfil from './CurrentProfil';

const ProfilPages = () => {
    const [updateProfilModal, setUpdateProfilModal] = useState(false);
    const [deleteProfilModal, setDeleteProfilModal] = useState(false);
    const [currentProfilModal, setCurrentProfilModal] = useState(true);

    const handleModals = (e) => {
        if (e.target.id === "profil-update") {
            setUpdateProfilModal(true);
            setDeleteProfilModal(false);
            setCurrentProfilModal(false)

        } else if (e.target.id === 'profil-delete') {
            setUpdateProfilModal(false);
            setDeleteProfilModal(true);
            setCurrentProfilModal(false)
        } else {
            setCurrentProfilModal(true);
            setUpdateProfilModal(false);
            setDeleteProfilModal(false);

        }
    };
    return (
        <div>
            <div className='profil-container'>
                <h1>Profil de 'nom dynamique'</h1>
           
                <div className='full-card'>
                <div className='left-card'>
                    {currentProfilModal && <CurrentProfil />}
                    {updateProfilModal && < UpdateProfil />}
                    {deleteProfilModal && < DeleteProfil />}
                </div>
            <div className='right-card'>
                <div className='nav-profilPage'>
                    <div className='right-card-top'>
                        <ul><li onClick={handleModals} id='profil-current' className={currentProfilModal ? 'active-btn' : null}>profil actuel</li>
                            <li onClick={handleModals} id='profil-update' className={updateProfilModal ? 'active-btn' : null}>Mettre à jour</li>
                            <li onClick={handleModals} id='profil-delete' className={deleteProfilModal ? 'active-btn' : null} >Supprimer le compte </li>
                        </ul>
                    </div>
                </div>
                <div className='right-card-bottom'>
                    <div className='admin'><li><a id='profil' className='contact-admin' href='mailto:groupoAdmin@groupo.com'>Contacter un admin</a></li></div>
                </div>
            </div>
        </div>
        </div>
        </div>


    );

}

export default ProfilPages;