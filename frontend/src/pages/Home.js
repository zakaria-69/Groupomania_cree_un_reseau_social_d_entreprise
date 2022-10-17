import React, { Component, useContext } from 'react';
import Footer from '../components/Footer';

const Home = () => {
    const token = localStorage.getItem('token');

        return (
            <div>       {/*si authentifier accede a home*/}
                {token ? (  
                <h1>Hello depuis Home</h1>
            
                ) : (

                    {/*si non authentifier msg et redirect*/},
                alert('veuillez vous connecter pour acceder à cette page' ),
                window.location = '/login'
                
                )}
            </div> 
            
            
)}

export default Home;