import React, { Component, useState, useEffect } from 'react';
import profilCss from '../../styles/profil.css';
import axios from 'axios';

const UpdateProfil = () => {
    let [userInfos, setUserInfos] = useState('');
    const userId = localStorage.getItem('userId');
    let [image, setImage] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [userName, setUserName] = useState('');
    let [bio, setBio] = useState('');

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

                })
                .catch((err) => console.log(err));
        };
        getUser();
    }, [])
    const handleUpdateProfil = async (e) => {
        e.preventDefault();

        console.log('**START HANDLE UPDATE PROFILE**');
        console.log('userInfos :', userInfos);
        console.log('image :' + image);
        console.log('firstName :' + firstName);
        console.log('lastName :' + lastName);
        console.log('userName :' + userName);
        console.log('bio :' + bio);
        console.log('**END HANDLE UPDATE PROFILE**');

        if (firstName != '' || lastName != '' || userName != '' || bio != '' || image != '') {
            //gestion des champs
            //const imageValidation = document.getElementById('image');
            const firstNameValidation = document.getElementById('firstName');
            const lastNameValidation = document.getElementById('lastName');
            const userNameValidation = document.getElementById('userName');
            const bioValidation = document.getElementById('bio');
            // const emailValidation = document.getElementById('email');
            const fieldValidation = document.getElementById('field');

            //gestion des erreurs 
            const fieldError = document.querySelector('.field.error');
            const firstNameError = document.querySelector('.firstName.error');
            const lastNameError = document.querySelector('.lastName.error');
            const userNameError = document.querySelector('.userName.error');
            // const emailError = document.querySelector('.email.error');

            firstNameError.textContent = "";
            lastNameError.textContent = "";
            userNameError.textContent = "";
            //emailError.innerHTML="";
            fieldError.textContent = "";
            fieldError.textContent = "";

            const isValidForm = true;

            //controle firstName
            if (firstName === '') {
                firstName = userInfos.firstName;
            } else {
                if (firstName.match(/^[a-zA-Z-]{2,25}$/)) {
                    firstNameError.textContent = 'valid';
                    firstNameError.style.color = 'yellowgreen'
                    firstNameValidation.style.border = 'solid green 2px'
                } else {
                    firstNameError.textContent = 'Autorise les lettres et les "-" uniquement  entre 2 et 25 caractères';
                    firstNameError.style.color = 'red'
                    firstNameValidation.style.border = 'solid red 2px';
                    isValidForm = false;
                }
            }
            if (lastName === '') {
                lastName = userInfos.lastName;
            } else {
                if (lastName.match(/^[a-zA-Z-]{2,25}$/)) {
                    lastNameError.textContent = 'valid';
                    lastNameError.style.color = 'yellowgreen'
                    lastNameValidation.style.border = 'solid green 2px'
                } else {
                    lastNameError.textContent = 'Autorise les lettres et les "-" uniquement entre 2 et 25 caractères';
                    lastNameError.style.color = 'red'
                    lastNameValidation.style.border = 'solid red 2px';
                    isValidForm = false;
                }
            }
            if (userName === '') {
                userName = userInfos.userName;
            } else {
                if (userName.match(/^[a-zA-Z0-9-_]{2,25}$/)) {
                    userNameError.textContent = 'valid';
                    userNameError.style.color = 'yellowgreen';
                    userNameValidation.style.border = 'solid green 2px';
                } else {
                    userNameError.textContent = 'Autorise les lettres les chiffres les "-" et "_" uniquement  entre 2 et 25 caractères';
                    userNameError.style.color = 'red';
                    userNameValidation.style.border = 'solid red 2px';
                    isValidForm = false;
                }
            }
            if (bio === '') {
                bio = userInfos.bio;
            }
            if (isValidForm) {
                await axios({
                    method: "patch",
                    url: `${process.env.REACT_APP_API_URL}api/users/` + userId,
                    data: {
                        image,
                        firstName,
                        lastName,
                        userName,
                        bio
                    },
                    headers: {
                        authorization: 'bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'

                    }
                })
                    .then((res) => {
                        alert('Felicitations ! Vôtre compte à été modifié avec succès  👍')
                        window.location = '/profil';
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        } else {
            alert('Rien à modifier');
        }
    }

    return (
        <div className='updtate-profil-container'>
            <form action='' onSubmit={handleUpdateProfil} id="update-profil-form">
                {/*image*/}
                <label htmlFor='image' className='profil-picture-update-label'>Image de Profil</label>
                <br />
                <input type='file'
                    name='image'
                    id='image'
                    accept='.jpg, .png, .jpeg, .gif'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />

                {/*firstName*/}
                <label htmlFor='firstName'>Prénom</label>
                <br />
                <input type='text'
                    name='firstName'
                    id="firstName"
                    defaultValue={userInfos.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <div className='firstName error'></div>
                <br />

                {/*lastName*/}
                <label htmlFor='lastName'>Nom</label>
                <br />
                <input type='text'
                    name='lastName'
                    id="lastName"
                    defaultValue={userInfos.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <div className='lastName error'></div>
                <br />

                {/*userName*/}
                <label htmlFor='userName'>Pseudo</label>
                <br />
                <input type='text'
                    name='userName'
                    id="userName"
                    defaultValue={userInfos.userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <div className='userName error'></div>
                <br />

                {/*bio */}
                <label htmlFor='bio'>Bio</label>
                <br />
                <textarea type='bio'
                    name='bio'
                    id="bio"
                    maxLength={250}
                    rows='10'
                    defaultValue={userInfos.bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <div className='bio error'></div>
                <br />
                <div className='field error' id='field'></div>
                <br />
                <input type="submit" value='mettre à jour le profil' className='update-profil-submit' />
            </form>
        </div>
    )
}



export default UpdateProfil;