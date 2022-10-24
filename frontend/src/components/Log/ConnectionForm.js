import React, { Component, useState } from 'react';
import axios from 'axios';

const ConnectionForm = () => {
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');



    const handleConnection = async (e) => {
        e.preventDefault();
        //gestion des champs
        const passwordCheckValidation = document.getElementById('passwordCheck');
        const passwordValidation = document.getElementById('password');
        const fieldValidation = document.getElementById('field');
        const firstNameValidation = document.getElementById('firstName');
        const lastNameValidation= document.getElementById('lastName');
        const userNameValidation = document.getElementById('userName');
        const emailValidation = document.getElementById('email');
        const termsValidation = document.getElementById('terms');

        //gestion des erreurs 
        const terms = document.getElementById('terms');
        const passwordCheckError = document.querySelector('.passwordCheck.error');
        const passwordError = document.querySelector('.password.error');
        const termsError = document.querySelector('.terms.error');
        const fieldError = document.querySelector('.field.error');
        const firstNameError = document.querySelector('.firstName.error');
        const lastNameError = document.querySelector('.lastName.error');
        const userNameError = document.querySelector('.userName.error');
        const emailError = document.querySelector('.email.error');

        passwordCheckError.textContent = "";
        termsError.textContent = "";
        firstNameError.textContent="";
        lastNameError.textContent="";
        userNameError.textContent="";
        emailError.textContent="";
        fieldError.textContent="";
        passwordError.textContent="";



       
        
            
            //controle firstName
                if(firstName.match(/^[a-zA-Z-]{2,25}$/) ){
                    firstNameError.textContent='valid';
                    firstNameError.style.color = 'yellowgreen'
                    firstNameValidation.style.border = 'solid green 2px'
                 }else{
                     firstNameError.textContent='Autorise les lettres et les "-" uniquement  entre 2 et 25 caractères';
                     firstNameError.style.color = 'red'
                     firstNameValidation.style.border = 'solid red 2px';
                     
               //control lastName
                 }
                 if(lastName.match(/^[a-zA-Z-]{2,25}$/) ){
                    lastNameError.textContent='valid';
                    lastNameError.style.color = 'yellowgreen'
                    lastNameValidation.style.border = 'solid green 2px'
                 }else{
                     lastNameError.textContent='Autorise les lettres et les "-" uniquement entre 2 et 25 caractères';
                     lastNameError.style.color = 'red'
                     lastNameValidation.style.border = 'solid red 2px';
                     e.preventDefault();
                      }
                //control userName
                 if(userName.match(/^[a-zA-Z0-9-_]{2,25}$/) ){
                    userNameError.textContent='valid';
                    userNameError.style.color = 'yellowgreen';
                    userNameValidation.style.border = 'solid green 2px';
                 }else{
                     userNameError.textContent='Autorise les lettres les chiffres les "-" et "_" uniquement  entre 2 et 25 caractères' ;
                     userNameError.style.color = 'red';
                     userNameValidation.style.border = 'solid red 2px';
                     e.preventDefault();
                 }//control email
                 if (email.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i) ){
                    emailError.textContent='valid';
                    emailError.style.color = 'yellowgreen';
                    emailValidation.style.border = 'solid green 2px';
                 }else{
                     emailError.textContent='veuillez saisir une adresse email valide';
                     emailError.style.color = 'red';
                     emailValidation.style.border = 'solid red 2px';
                     e.preventDefault();
                    
                    }
                    //control password
                  if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/)){
                    passwordError.textContent='valid';
                    passwordError.style.color = 'yellowgreen';
                    passwordValidation.style.border = 'solid green 2px';
                 }else{
                    passwordError.textContent='minimum 8 caractères maximum 25 dont 1 majuscule,1minuscule et 1 nombre';
                    passwordError.style.color = 'red';
                    passwordValidation.style.border = 'solid red 2px';
                    e.preventDefault();

                 }//control passwordCheck
                 if(passwordCheck.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/) && passwordCheck !== "" && passwordCheck ===password){
                    passwordCheckError.textContent='valid';
                    passwordCheckError.style.color = 'yellowgreen';
                    passwordCheckValidation.style.border = 'solid green 2px';
                 }else{
                    passwordCheckError.textContent='les mots de passe ne correspondent pas ';
                    passwordCheckError.style.color = 'red';
                    passwordCheckValidation.style.border = 'solid red 2px';
                    e.preventDefault();

                 }//control termsCheck
                 if( !terms.checked ){
                    termsError.textContent = "Veuillez valider les conditions générales";
                    termsError.style.color='red';
                    termsValidation.style.border='solid red 2px';
                    e.preventDefault();
                 }else{
                    termsError.textContent = "conditions générales acceptées";
                    termsError.style.color='yellowgreen';
                    termsValidation.style.border='solid green 2px';
                 }
                 if(  firstName === "" || lastName === "" || userName === "" || email === "" || password === "" || passwordCheck === "" || !terms.checked){
                    fieldError.textContent = "Veuillez remplir tout les champs (champ image non obligatoire)";
                    fieldError.style.color='red';
                    fieldValidation.style.border='solid red 2px';
                    e.preventDefault();
                 }//if all ok execute Form treatement
                 
                 else {
            await axios({
                method :"post",
            url:`${process.env.REACT_APP_API_URL}api/users/signup`,
                 data: {
                    image,
                    firstName,
                    lastName,
                    userName,
                    email,
                    password
                },
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'

                }})
                .then((res) => {
                 console.log("res1", res)

                    console.log(res.data.errors)
                    alert('Felicitations ! Vôtre compte à été crée avec succès  👍' )
                    window.location = '/login';


        
    })
                .catch((res) =>{
                    console.log(res)
                //fieldError.innerHTML=res.response.data.error.errors[0].message           


                } )
        }

    }

    return (



        <form action='' onSubmit={handleConnection} id="connection-form">
            {/*image*/}
            <label htmlFor='image'>Image de Profil</label>
            <br />
            <input type='file'
                name='image'
                id="image"
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
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName} />
                 <div className='firstName error'></div>
            <br />

            {/*lastName*/}

            <label htmlFor='lastName'>Nom</label>
            <br />
            <input type='text'
                name='lastName'
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName} />
                <div className='lastName error'></div>
            <br />


            {/*userName*/}

            <label htmlFor='userName'>Pseudo</label>
            <br />
            <input type='text'
                name='userName'
                id="userName"
                onChange={(e) => setUserName(e.target.value)}
                value={userName} />
                <div className='userName error'></div>
            <br />

            {/*email*/}

            <label htmlFor='email'>email</label>
            <br />
            <input type='text'
                name='email'
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <div className='email error'></div>
            <br />

            {/*password*/}

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password'
                name='password'
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
                <div className='password error'></div>
            <br />

            {/*passwordCheck*/}

            <label htmlFor='passwordCheck'>Confimer mot de passe </label>
            <br />
            <input type='password'
                name='passwordCheck'
                id="passwordCheck"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck} />
            <div className='passwordCheck error'></div>

            {/*terms*/}
            <br />
            <label htmlFor='terms' >J'accepte les<a href="/" target='_blank' rel="noopener noreferrer"> conditions générales
            </a>
            </label>
            <input type='checkbox'
             id="terms" 
             //required
             />
            <div className='terms error'></div>
            <br />
            <div className='field error'></div>
            <br />
            <input type="submit" value='Valider inscription' id="validate-form"/>
        </form>
    );
}

export default ConnectionForm;