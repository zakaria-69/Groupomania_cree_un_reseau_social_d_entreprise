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
    console.log('data.comment', comment)

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


    const handleUpdateComment = async () => {
        {
            await axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/comments/` + comment.id,
                data: {
                    content,
                    UserId: comment.UserId,
                    CommentId: comment.CommentId
                },
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'

                }
            })
                .then((res) => {
                    console.log(res)
                    alert('Post modifié avec succès');
                    setContent('')

                })
                .catch((err) => alert(console.log(err)));
            setContent('')
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

                        alert('vôtre post a été correctement supprimé')
                        window.location.reload();
                        console.log(res)
                    })
                    .catch((err) => { console.log(err) })
            }; deleteOneComment();

        } else {
            alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)

        };
    }

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
                alert("vôtre choix a été pris en compte")
            })
            .catch((err) => console.log(err));
    }

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
                                    crée le :{timeStampHandler(createdAt)}
                                </span>
                                <span className='udpated-date'>
                                    modifié le :{timeStampHandler(updatedAt)}
                                </span>
                            </div>
                        </div>
                    ) : 
                    (
                        <p>{comment.content} :id =  {comment.id}</p>
                    )}
                    <div className='comment-actions'>
                        <span>
                            <li>
                                <button title='trash'
                                    onClick={handleDeleteComment}>
                                    <i class="fa-regular fa-trash-can">
                                    </i>
                                </button>
                            </li>
                        </span>
                        <span>
                            <li>
                                <button title='comment update'
                                    onClick={() => setIsUpdated(!isUpdated)}>
                                    <i class="fa-regular fa-pen-to-square">
                                    </i>
                                </button>
                            </li>
                        </span>
                        <li>
                            <button title='comment-like'
                                id='comment-like'
                                onClick={handleLikeComment}>
                                <i class="fa-regular fa-heart">
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