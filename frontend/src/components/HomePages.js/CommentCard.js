import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const CommentCard = (data) => {
    const [userInfos, setUserInfos] = useState('');
    let [createdAt, setCreatedAt] = useState('');
    let [updatedAt, setUpdatedAt] = useState('');
    let [uid, setUid] = useState('');
    let [commentId, setCommentId] = useState('');
    let [like, setLike] = useState('');
    let [content, setContent] = useState('');
    const [isUpdated, setIsUpdated] = useState('');
    let userId = localStorage.getItem('userId')
    userId = parseInt(userId)
    const comment = data.comment;

    useEffect(() => {
        setCreatedAt(comment.createdAt);
        setUpdatedAt(comment.updatedAt);
        setUid(comment.UserId);
        setCommentId(comment.id);
        setLike(comment.like);
        setContent(comment.content);
        axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,
            {
                headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                Accept: 'application/json',
                'Content-Type': 'application/json',
            })
            .then((res) => {
                setUserInfos(res.data)
                // console.log('userInfos', userInfos);
            })
            .catch((err) => console.log(err));
    }, [CommentCard])

    //fonction de gestion de modification de commentaires
    const handleUpdateComment = async () => {
        {
            await axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/comments/` + comment.id,
                data: {
                    content,
                    UserId: comment.UserId
                },
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    console.log(res)
                    alert('Post modifi?? avec succ??s');
                    window.location.reload();
                })
                .catch((err) => alert(console.log(err)));
        }
    }

    //fonction de suppression de commentaire 
    const handleDeleteComment = () => {
        if (userId === comment.UserId || userInfos.isAdmin) {
            const deleteOneComment = async () => {
                await axios.delete(`${process.env.REACT_APP_API_URL}api/comments/` + comment.id,
                    {
                        headers: {
                            authorization: 'bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((res) => {
                        alert('v??tre post a ??t?? correctement supprim??')
                        window.location.reload();
                        console.log(res)
                    })
                    .catch((err) => { console.log(err) })
            }; deleteOneComment();

        } else {
            alert(`D??sol??!vous n'??tes pas autoris?? a supprim?? ce message!`)

        };
    }

    //fonction de gestion des likes sur les commentaires 
    const handleLikeComment = async () => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/comments/` + comment.id + '/like',
            headers: {
                authorization: 'bearer ' + localStorage.getItem('token'),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                setLike(res.data.like);
                console.log('res data like', res.data.like)

                console.log('postlikeNumber', like)
                console.log('res data like post', res)
                alert("v??tre choix a ??t?? pris en compte")
            })
            .catch((err) => console.log(err));
    }

    //fonction de gestion des timestamps
    const timeStampHandler = (num) => {
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        let timeStamp = Date.parse(num);
        let date = new Date(timeStamp).toLocaleDateString('fr-FR', options)
        return date.toString();
    }

    return (
        <div className='comments-container'>
            <div className=' comments-subContainer'>
                <div className='display-one-comment' >
                    {isUpdated ? (
                        <div className='update-text-date-container'>
                            <textarea type='text'
                                name='update-comment'
                                id='update-comment-content'
                                defaultValue={comment.content}
                                maxLength={250}
                                onChange={(e) => setContent(e.target.value)}
                            >
                            </textarea>
                            <div className='comment-date-style-handler'>
                                <span className='creation-date'>
                                    cr??e le :{timeStampHandler(createdAt)}
                                </span>
                                <span className='udpated-date'>
                                    modifi?? le :{timeStampHandler(updatedAt)}
                                </span>
                            </div>
                        </div>
                    ) : 
                    (
                        <p>{comment.content}</p>
                    )}
                    <div className='comment-actions'>
                        <span>
                            <li>
                                <button title='trash'
                                    onClick={handleDeleteComment}>
                                    <i className="fa-regular fa-trash-can">
                                    </i>
                                </button>
                            </li>
                        </span>
                        <span>
                            <li>
                                <button title='comment update'
                                    onClick={() => setIsUpdated(!isUpdated)}>
                                    <i className="fa-regular fa-pen-to-square">
                                    </i>
                                </button>
                            </li>
                        </span>
                        <li>
                            <button title='comment-like'
                                id='comment-like'
                                onClick={handleLikeComment}>
                                <i className="fa-regular fa-heart">
                                    <span id={like ? 'comment-like-number' : 'no-likes'}>
                                        {like}
                                    </span>
                                </i>
                            </button>
                        </li>
                    </div>
                </div>
            </div>
            {isUpdated ? (
                <div className='submit-comment'>
                    <input type='submit'
                        id='submit-comment'
                        value='modifier'
                        onClick={handleUpdateComment}>
                    </input>
                </div>) :
                (
                    <div className='submit-comment'
                        style={{ display: 'none' }}>
                        <input type='submit'
                            id='submit-comment'
                            value='modifier'
                            onClick={handleUpdateComment}>
                        </input>
                    </div>)}
            <ul>
            </ul>
        </div>
    )
}

export default CommentCard; 


