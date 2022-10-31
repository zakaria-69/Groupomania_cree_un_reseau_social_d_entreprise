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
    //console.log('data.comment',comment)
    //console.log(comment.id);
    //console.log(comment.CommentId);
    //console.log('userInfos',userInfos.id)
    //

    useEffect(() => {

        const getUser = async (comment) => {
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

        };
        getUser();
    }, [CommentCard])

    //get all posts
    useEffect(() => {
        const getAllPosts = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/posts`,
                {
                    headers: {
                        authorization: 'bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                        'Content-Type': 'application/json',

                    }
                })
                .then((res) => {
                    setAllPostsDatas(res.data)
                    console.log('AllPostsDatas form comment Card', allCommentsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllPosts()
    }, [CommentCard])


    //get all comments
    useEffect(() => {
        const getAllComments = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/comments`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setAllCommentsDatas(res.data)
                    // console.log('AllcommentsDatas', allCommentsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllComments()
    }, [CommentCard])


    const handleSubmitComment = async (userInfos) => {
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
         //controle si tout les champs vides */
        if (content === '' || comment.CommentId === '' || comment.UserId === '') {
            alert('un des champs est vide')
            setContent('')
        } else if (content === null || userId === null || commentId === null) {
            alert("un des champs n'est pas bon ")
            setContent('')

        } else if (content === undefined || comment.CommentId === undefined || commentId === undefined) {
            alert("un des champs est undefined ")
            setContent('')

        } {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comments`,
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
                    alert('Post crée avec succès');
                    setContent('')

                })
                .catch((err) => alert(console.log(err)));
            setContent('')
            // alert("err")
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


    const handleUpdateOneComment = () => {
        if (userId == comment.UserId || userInfos.isAdmin) {
            const updateOneComment = async () => {
                /* if(title || text || image ){
                     console.log('**START HANDLE UPDATE POST**');
                     console.log('title :', title);
                     console.log('post title :', post.title);
                     console.log('image :', image);
                     console.log('post image :' , post.imageUrl);
                     console.log(' text :'  , text);
                     // console.log('lastName :' + lastName);
                     // console.log('userName :' + userName);
                     // console.log('bio :' + bio);
                     console.log('**END HANDLE UPDATE POST**');*/
                await axios({
                    method: 'patch',
                    url: `${process.env.REACT_APP_API_URL}api/comments/` + comment.id,
                    data: {
                        content,
                        like
                    },
                    headers: {
                        authorization: 'bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then((res) => {
                        console.log('title 4', content)
                        setAllCommentsDatas(res.data)
                        alert('vôtre post a été correctement modifié')
                        setIsUpdated(false)
                        // window.location.reload();
                        console.log('AllCommentsDatas from patch post', res)
                    })
                    .catch((err) => {
                        console.log(err)
                        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
                    })
                /*}else{
            alert('rien à modifié')
        }*/
            }; updateOneComment();
        } else {
            alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
        }
    }

    const handleLikeComment = async () => {
        // try{
        if (/*userId !== post.userId */  /*userId !== post.UserId &&*/ isLiked === false) {
            console.log('veut liker')
            //console.log('userinfos Id = : id du user connecter',userInfos.id)
            console.log('userinfos Id = : id du user connecter from ls', userId)
            console.log('post like before = nombre de like :', comment.like)
            console.log(" const like nombre de like ", like)
            console.log('post User id = : id du post a liker', comment.UserId)
            console.log('post Id = : id du post a liker', comment.id)
            console.log('post title = : title du post a liker', comment.title)
            setIsLiked(true);
            comment.like += 1;
            console.log('comment like', comment.like)

            // console.log(like)
        } else if (/*userId === post.UserId &&*/ isLiked === true) {
            comment.like -= 1;
            console.log('comment like', comment.like)
            setIsLiked(false);

        } {


            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comments/` + comment.id + '/like',
                data: {
                    like: comment.like,
                    UserId: userId
                },
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'

                }
            })
                .then((res) => {
                    //JSON.stringify(res.data)
                    setLike(res.data.like)
                    console.log('commentLikeNumber', res)
                    alert("vôtre choix a été pris en compte")
                })
                .catch((err) => console.log(err));
        }
        // }
        /*catch(err){
        console.log(err)
        }*/
    }


    //console.log('allcommentsDatas',allCommentsDatas)

    useEffect(() => {
        const handleCommentCardDisplay = () => {
            // console.log(allPostsDatas[0].UserId)
            //setCreatedAt(comment.createdAt);
            //  console.log('createdAt',createdAt)
            // setUpdatedAt(comment.updatedAt);
            //  console.log('updatedAt',updatedAt)
            //setUid(comment.UserId);
            //  console.log('uid',uid);
            // setCommentId(comment.id);
            //  console.log('commentId',commentID);
            // setLike(comment.like);
            //  console.log('like',like);
            // setContent(comment.content);
            //  console.log('content',content)

        }; return handleCommentCardDisplay();
    }, [])

    const handleRelativeComments = (props) => {
        console.log(props)
        if (comment.UserId) {
            console.log('allcommentsData relative', allCommentsDatas)

        }
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
                        <textarea type='text'
                            name='update-comment'
                            id='update-comment-content'
                            defaultValue={comment.content}
                            maxLength={250}
                            onChange={(e) => setContent(e.target.value)}

                        >
                        </textarea>
                    ) : (
                        <p>{comment.content}{comment.id} afficher les coms</p>

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
                            <button title='comment like'
                            id='comment-like'
                                onClick={handleLikeComment}>
                                <i class="fa-regular fa-heart">
                                    <span id={comment.like ? 'comment-like-number' : 'no-likes'}>
                                        {comment.like}
                                    </span>
                                </i>
                            </button>
                            </li>
                       
                    </div>
                </div>
            </div>
            {isUpdated ? (
                <div className='submit-comment'>
                    <input type='submit' id='submit-comment' value='modifier' onClick={handleSubmitComment}>
                    </input>
                </div>) : (
                <div className='submit-comment' style={{ display: 'none' }}>
                    <input type='submit' id='submit-comment' value='modifier' onClick={handleSubmitComment}></input>
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