import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const loginError = document.querySelector('.login.error');


        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/users/login`,
            data: {
                email,
                password
            },
        })
            .then((res) => {
                console.log('res1', res.data.token)
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('userId',res.data.userId)
                console.log('res1id', res.data.userId)
                alert('Vous êtes connecter avec succès 👌 ');
                window.location = '/';
                
            })
            .catch((res) => {
                console.log(res)
                loginError.innerHTML = res.response.data.message;
            })
    }
    return (

        <form action='' onSubmit={handleLogin} id='sign-up-form'>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <br />


            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password'
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
            <div className='login error'></div>
            <br />


            <input type='submit' value='Se connecter' id='validate-form' />
        </form>


    );
}

export default LoginForm;