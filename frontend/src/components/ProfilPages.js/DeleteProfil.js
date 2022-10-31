import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const DeleteProfil = () => {
    const [userInfos, setUserInfos] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                })
                .then((res) => {
                    setUserInfos(res.data);
                    //setId(userInfos.id)
                })
                .catch((err) => console.log(err));
        };
        getUser();
    }, [])

    const handleDeleteUser = () => {
        if (userInfos.id == userId || userInfos.isAdmin) {
            const deleteUser = async () => {
                axios.delete(`${process.env.REACT_APP_API_URL}api/users/` + userId,
                    {
                        headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    })
                    .then((res) => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        window.location = '/login';
                    })
                    .catch((err) => console.log(err));

            }; deleteUser();
        } else {
            alert("vous n'êtes pas autorisé à supprimé ce compte!")
        };

    }
    return (
        <div className='delete-profil-container'>
            <div className='image-container'>
                <img src='../../img/sad-goodbyes.jpeg' alt='au-revoir-triste' className='sad-goodbyes' />
            </div>
            <div className='to-user-delete-message'>
                <p id='to-user-delete-message'>
                    Nous Sommes désolé de vous voir nous quitter.Nous ésperons que vous ayez pu profiter d'une éxperience de qualitée sur nôtre plateforme 🤝
                </p>
                <br />
                <div className='submit-delete-account'>
                    <h5 className='warning-delete-account'>
                        Attention⚠!supprimer vôtre compte entrainera une perte définitive de celui-ci et de tout ce qu'il contient de façon irreversible !
                    </h5>
                    <button type='submit'
                        id='delete-profil-validation'
                        name="delete-profil-validation"
                        className='delete-profil-validation'
                        onClick={() => {
                            if (window.confirm('voulez vous vraiment supprimer vôtre compte?')) {
                                handleDeleteUser();
                            }
                        }}>Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}


export default DeleteProfil;