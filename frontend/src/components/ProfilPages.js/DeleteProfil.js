import React, { Component } from 'react';

class DeleteProfil extends Component {
    render() {
        return (
            <div className='delete-profil-container'>
                <div className='image-container'>
                    <img src='../../img/sad-goodbyes.jpeg' alt='au-revoir-triste' className='sad-goodbyes' />
                </div>
                <div className='label-submit'>
                    <label htmlFor='delete-account' id='delete-account-motivation' name='delete-account'>Motifs</label>
                    <br />
                    <textarea
                        name='delete-account'
                        id="delete-account"
                        className='delete-account'
                        placeholder="Nous sommes navrés de vous voir partir!&#10;
                 À des fins d'améliorations de nos services,
                veuillez nous indiquer la raison de la suppression de vôtre compte."
                        maxLength={750}
                        wrap='hard'
                        rows='10'
                    />
                    <br />
                    <div className='submit-delete-account'>
                        <input type='submit'
                        id='delete-profil-validation'
                            name="delete-profil-validation"
                            className='delete-profil-validation'>
                        </input>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteProfil;