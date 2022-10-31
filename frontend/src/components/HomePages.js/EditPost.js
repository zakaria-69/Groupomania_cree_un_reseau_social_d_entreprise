import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'

const EditPost = () => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const [userInfos, setUserInfos] = useState('');
    const userId = localStorage.getItem('userId');

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
                })
                .catch((err) => console.log(err));

        };
        getUser();
    }, [])



    const handleSubmitPost = async (e) => {
        //controle si tout les champs vides 
        if (image === '' && title === '' && text === '') {
            alert('rien a poster')
            e.preventDefault();
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/posts`,
                data: {
                    image,
                    title,
                    text
                },
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'

                }
            })
                .then((res) => {
                    alert('Post crée avec succès');

                })
                .catch((err) => alert(console.log(err)));
            alert("err")
        }
    }

    return (
        <form action='' onSubmit={handleSubmitPost} id='post-submit-form' >
            <div className='post-edit'>
                <h3>{userInfos.firstName} {userInfos.userName}</h3>
                <label htmlFor='title'>Titre</label>
                <input type='text'
                    name='title'
                    placeholder='choisissez un titre'
                    className='title-edit'
                    id='title'
                    maxLength={125}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                >
                </input>
                <label htmlFor='image'>image</label>
                <input type='file'
                    name='image'
                    className='image-pic'
                    id='image'
                    accept='.jpg, .png, .jpeg, .gif'
                    onChange={(e) => setImage(e.target.files[0])}

                >
                </input>
                <label htmlFor='text'>Text</label>
                <textarea type='text'
                    id='text'
                    placeholder='saisissez le contenu de vôtre post'
                    maxLength={500}
                    className='textContent-edit'
                    onChange={(e) => setText(e.target.value)}
                    value={text}>
                </textarea>
                <input type="submit"
                    className="submit-post"
                    value="poster"
                />
            </div>
        </form>
    );
}

export default EditPost;