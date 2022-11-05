import React, { Component } from 'react';
import footer from "../styles/footer.css";

const Footer = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        alert('vous êtes deconnecter');
    }

    return (
        <footer>

            <ul className='footer-contact'>
                <li className='contact'><a href='mailto:groupomania@groupomania.com' className='contact'>
                    Contact
                </a>
                </li>
            </ul>
            <ul className='footer-reseaux'>
                <h4>Nos réseaux sociaux</h4>
                <li className='twitter'>
                    <a href='https://twitter.com'>
                        Twitter
                    </a>
                </li>
                <li className='instagram'>
                    <a href="https://www.instagram.com">
                        Instagram</a>
                </li>
                <li className='linkedin'>
                    <a href="https://fr.linkedin.com/">
                        Linkedin
                    </a>
                </li>
            </ul>
            <ul className='footer-nav'>
                <h4>Navigation</h4>
                <li className="footer-ancer">
                    <a href='/login'>
                        retour vers Login
                    </a>
                </li>
                <li className="footer-ancer">
                    <a href='/profil'>
                        retour vers Profl
                    </a>
                </li>
                <li className="footer-ancer">
                    <a href='/'>
                        retour vers Home
                    </a>
                </li>
                {token ? (
                    <li className="footer-ancer" onClick={logout}>
                        <a href='/login'>
                            Déconnexion
                        </a>
                    </li>
                ) : (
                    <li className="footer-ancer"
                        style={{ display: 'none' }}
                        onClick={logout}>
                        <a href='/login'>Déconnexion</a>
                    </li>
                )}
            </ul>
        </footer>
    );
}

export default Footer;