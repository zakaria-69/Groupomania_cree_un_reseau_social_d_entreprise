import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import EditComment from './EditComment';

const CommentCard = (data) => {



    const [userInfos, setUserInfos] = useState('');
    const [allCommentsDatas, setAllCommentsDatas] = useState('');
    let [createdAt, setCreatedAt] = useState('');
    let [updatedAt, setUpdatedAt] = useState('');
    let [uid, setUid] = useState('');
    let [commentId, setCommentId] = useState('');
    let [uniqueCommentId, setUniqueCommentId] = useState('');
    let [like, setLike] = useState('');
    let [content, setContent] = useState('');
    const [isUpdated, setIsUpdated] = useState('');
    //const [userId,setUserId] = useState ('');
    const [allPostsDatas, setAllPostsDatas] = useState('');
    const [isComUpdated, setIsComUpdated] = useState(false);
    const [isLiked, setIsLiked] = useState(false);



    let userId = localStorage.getItem('userId')
    userId = parseInt(userId)
    //  console.log('constuserId',userId)
    const comment = data.comment;
    console.log('data.comment',comment)
    //console.log(comment.id);
    //console.log(comment.CommentId);
    //console.log('userInfos',userInfos.id)
    //

    useEffect(() => {
        setCreatedAt(comment.createdAt);
        console.log('createdAt',createdAt)
       setUpdatedAt(comment.updatedAt);
        console.log('updatedAt',updatedAt)
      setUid(comment.UserId);
        console.log('uid',uid);
       setCommentId(comment.id);
        console.log('commentId',commentId);
       setLike(comment.like);
        console.log('like',like);
       setContent(comment.content);
        console.log('content',content)

            console.log('comment from get user', comment)
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
      /*
        // setUniqueCommentId(comment.id)
        // console.log(comment.id);
        //setUserId(userInfos.id);
        // commentId= comment.id;
        // console.log(commentId)
        //setCommentId(comment.CommentId);
        console.log('userinfosId', comment.UserId)
        // console.log(userId)
        console.log('commentID', comment.CommentId)
        // console.log(commentId)
        /* console.log('**START HANDLE UPDATE PROFILE**');
         console.log('content :' + content);
         console.log('updatedAt :' + updatedAt);
         console.log('createdAt :' + createdAt);
         console.log('like :' + like);
         console.log('userId :' + userId);
         console.log('**END HANDLE UPDATE PROFILE**');
         //controle si tout les champs vides 
        if (content === '' || comment.CommentId === '' || comment.UserId === '') {
            alert('un des champs est vide')
            setContent('')
        } else if (content === null || userId === null || commentId === null) {
            alert("un des champs n'est pas bon ")
            setContent('')

        } else if (content === undefined || comment.CommentId === undefined || commentId === undefined) {
            alert("un des champs est undefined ")
            setContent('')

        } */{
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


    //delete Comments
    //fonction de suppression de post 
    const handleDeleteComment = () => {
        console.log('const2userid', userId)
        console.log('userId from delete comment', userId)
        console.log('comment UserId from delete comment', comment.UserId)
        console.log('isAdmin', userInfos.isAdmin)
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
                        // setAllPostsDatas(res.data)
                        alert('vôtre post a été correctement supprimé')
                        window.location.reload();
                        console.log(res)
                        //alert(res.response.data.message)
                        //console.log('AllPostsDatas', allPostsDatas)
                    })
                    // console.log(res.response.data.message)
                    .catch((err) => { console.log(err) })
                //alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)});


            }; deleteOneComment();

        } else {
            alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)

        };
    }

    const handleLikeComment = async () => {
        // try{
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
                    //JSON.stringify(res.data)
                    setLike(res.data.like);
                    console.log('res data like', res.data.like)
                    
                    console.log('postlikeNumber', like)
                    console.log('res data like post',res)
                    alert("vôtre choix a été pris en compte")
                })
                .catch((err) => console.log(err));
        }
        // }
        /*catch(err){
        console.log(err)
        }*/

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
                {/* <input type='text'
                        name='content'
                        id='content'
                        defaultValue='saisissez vôtre commmentaire ici'
                        onChange={(e)=>setContent(e.target.value)}
                        >
                    </input>*/}
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
                    <span className='creation-date'>crée le :{timeStampHandler(createdAt)}</span>
                    <span className='udpated-date'>modifié le :{timeStampHandler(updatedAt)}</span>
                </div>

                        </div>
                    ) : (
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
                    <input type='submit' id='submit-comment' value='modifier' onClick={handleUpdateComment}>
                    </input>
                </div>) : (
                <div className='submit-comment' style={{ display: 'none' }}>
                    <input type='submit' id='submit-comment' value='modifier' onClick={handleUpdateComment}></input>
                </div>)}
            <ul>
                {/*}   {allCommentsDatas &&
                            // comment.id === comment.UserId &&
                            allCommentsDatas.reverse() &&
                          ((comment) => {
                                console.log('postfrom map : ', comment.id)
                                return <EditComment comment={comment} key={comment.id} />

                            })}

                        {allCommentsDatas &&
                            // comment.id === comment.UserId &&
                            allCommentsDatas.reverse() &&
                            allCommentsDatas.map((comment) => {
                                console.log('postfrom map : ', comment.id)
                                return <CommentCard comment={comment} key={comment.id} />

                            })} */}
            </ul>
        </div>
    )
}

export default CommentCard;