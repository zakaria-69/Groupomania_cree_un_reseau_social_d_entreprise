import React from 'react';
import HomePages from '../components/HomePages.js/index.js'
import HomeCss from '../styles/home.css'

const Home = () => {
    const token = localStorage.getItem('token');

    return (
        <div class='home-page-container'>
            {/*si authentifier accede a home*/}
            {token ? (
                //<h1>Hello depuis Home</h1>,
                <HomePages />
            ) : (
                {/*si non authentifier msg et redirect*/ },
                alert('veuillez vous connecter pour acceder à cette page'),
                window.location = '/login'
            )}
        </div>
    )
}

export default Home;