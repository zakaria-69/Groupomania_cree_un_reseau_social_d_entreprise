import React, { Component, useState, useEffect } from 'react';
import profilCss from '../../styles/profil.css';
import axios from 'axios';

const UpdateProfil = () => {
    let [userInfos, setUserInfos] = useState('');
    const userId = localStorage.getItem('userId');
    //   console.log(userId)

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setUserInfos(res.data)
                    // console.log('userInfos',userInfos);
                })
                .catch((err) => console.log(err));

        };
        getUser();
    }, [])

    //console.log('userInfos2',userInfos.firstName)


    const [profilPicture, setProfilPicture] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [userName, setUserName] = useState('');
    //const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');



    const handleUpdateProfil = async (e) => {
        e.preventDefault();
        //gestion des champs
        const profilPictureValidation = document.getElementById('profilPicture');
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

        //controle firstName
        if (firstName.match(/^[a-zA-Z-]{2,25}$/)) {
            firstNameError.textContent = 'valid';
            firstNameError.style.color = 'yellowgreen'
            firstNameValidation.style.border = 'solid green 2px'
        } else {
            firstNameError.textContent = 'Autorise les lettres et les "-" uniquement  entre 2 et 25 caractères';
            firstNameError.style.color = 'red'
            firstNameValidation.style.border = 'solid red 2px';
            e.preventDefault();

            //control lastName
        }
        if (lastName.match(/^[a-zA-Z-]{2,25}$/)) {
            lastNameError.textContent = 'valid';
            lastNameError.style.color = 'yellowgreen'
            lastNameValidation.style.border = 'solid green 2px'
        } else {
            lastNameError.textContent = 'Autorise les lettres et les "-" uniquement entre 2 et 25 caractères';
            lastNameError.style.color = 'red'
            lastNameValidation.style.border = 'solid red 2px';
            e.preventDefault();
        }
        //control userName
        if (userName.match(/^[a-zA-Z0-9-_]{2,25}$/)) {
            userNameError.textContent = 'valid';
            userNameError.style.color = 'yellowgreen';
            userNameValidation.style.border = 'solid green 2px';
        } else {
            userNameError.textContent = 'Autorise les lettres les chiffres les "-" et "_" uniquement  entre 2 et 25 caractères';
            userNameError.style.color = 'red';
            userNameValidation.style.border = 'solid red 2px';
            e.preventDefault();
        }//control email
         /*if(email.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i) || email === email.defaultValue ){
            emailError.textContent='valid';
            emailError.style.color = 'yellowgreen';
            emailValidation.style.border = 'solid green 2px';
         }else{
             emailError.textContent='veuillez saisir une adresse email valide';
             emailError.style.color = 'red';
             emailValidation.style.border = 'solid red 2px';
             e.preventDefault();
            }*/if (firstName === '') {
            
            firstNameError.textContent = 'le champ prénom ne peut être vide (entre 2 et 25 caractère des lettres et des  "-" uniquement )';
            firstNameError.style.color = 'red';
            firstNameValidation.style.border = 'solid red 2px';
            firstName = firstNameValidation.value
            console.log('firstName', firstName)
            if (firstName === firstNameValidation.value) {
                firstNameError.textContent = 'Prénom déjà valid ';
                firstNameError.style.color = 'green';
                firstNameValidation.style.border = 'solid green 2px';
                console.log('firstName', firstName)
            }
        } if (lastName === '') {
            
            // console.log('lastname affected ', lastName)
            lastNameError.textContent = 'le champ nom ne peut être vide (entre 2 et 25 caractère des lettres et des "-" uniquement)';
            lastNameError.style.color = 'red';
            lastNameValidation.style.border = 'solid red 2px';
            lastName = lastNameValidation.value
            console.log('lastname', lastName)
            if (lastName === lastNameValidation.value) {
                console.log('lastname affected ', lastName)
                lastNameError.textContent = 'Nom déjà valid';
                lastNameError.style.color = 'green';
                lastNameValidation.style.border = 'solid green 2px';
                console.log('lastname', lastName)
            }
        } if (userName === '') {
            
            userNameError.textContent = 'le champ pseudo ne peut être vide (entre 2 et 25 caractère des lettres des chiffres ainsi que "-" et "_")';
            userNameError.style.color = 'red';
            userNameValidation.style.border = 'solid red 2px';
            console.log('username', userName)
            userName = userNameValidation.value

            if (userName === userNameValidation.value) {
                userNameError.textContent = 'Pseudo déjà valid';
                userNameError.style.color = 'green';
                userNameValidation.style.border = 'solid green 2px';
                console.log('username', userName)
                alert('Rien à modifié')
            }

        }
        else if (firstName === "" || firstName !== firstNameValidation.value && lastName === "" || lastName !== lastNameValidation.value || userName === "" || userName !== userNameValidation.value) {
            fieldError.textContent = "Veuillez remplir tout les champs (champ image et bio non obligatoire)";
            fieldError.style.color = 'red';
            fieldValidation.style.border = 'solid red 2px';
            e.preventDefault();
        }//if all ok execute Form treatement

        else {

            await axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/users/` + userId,
                headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                Accept: 'application/json',
                'Content-Type': 'application/json',


                data: {
                    profilPicture,
                    firstName,
                    lastName,
                    userName,
                    // email,
                    bio
                },



            })




                .then((res) => {



                    console.log("res1", res)

                    console.log('resdata', res.data)
                    console.log("userInfos from res patch", userInfos)
                    alert('Felicitations ! Vôtre compte à été modifié avec succès  👍')
                   // window.location = '/profil';



                })
                .catch((res) => {
                    console.log(res)
                    fieldError.innerHTML = res.response.data.error.errors[0].message


                })
        }

    }



    return (
        <div className='updtate-profil-container'>
            <form action='' onSubmit={handleUpdateProfil} id="update-profil-form">
                {/*profilPicture*/}
                <label htmlFor='profilPicture' className='profil-picture-update-label'>Image de Profil</label>
                <br />
                <input type='file'
                    name='profilPicture'
                    id="update-profilPicture"
                    accept='.jpg, .png, .jpeg, .gif'
                    onChange={(e) => setProfilPicture(e.target.value)}
                    value={profilPicture} />
                <br />
                {/*firstName*/}
                <label htmlFor='firstName'>Prénom</label>
                <br />
                <input type='text'
                    name='firstName'
                    id="firstName"
                    defaultValue={userInfos.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                //value={firstName}
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
                //value={lastName} 
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
                //value={userName}
                />
                <div className='userName error'></div>
                <br />

                {/*email

            <label htmlFor='email'>email</label>
            <br />
            <input type='text'
                name='email'
                id="email"
                defaultValue={userInfos.email}
                onChange={(e) => setEmail(e.target.value)}
               // value={email} 
                />
            <div className='email error'></div>
            <br / >/}

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
                //value={bio}
                />
                <div className='bio error'></div>
                <br />
                <div className='field error' id='field'></div>
                <br></br>
                <input type="submit" value='mettre à jour le profil' className='update-profil-submit' />



            </form>
        </div>

    )
}



export default UpdateProfil;