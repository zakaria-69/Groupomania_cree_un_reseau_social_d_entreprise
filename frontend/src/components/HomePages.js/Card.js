import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';

const Card = (data) => {
    const [allCommentsDatas, setAllCommentsDatas] = useState('');
    const [displayComments, setDisplayComments] = useState(false);
    const [userInfos, setUserInfos] = useState('');
    const [allPostsDatas, setAllPostsDatas] = useState('');
    let [createdAt, setCreatedAt] = useState('');
    let [updatedAt, setUpdatedAt] = useState('');
    let [uid, setUid] = useState('');
    let [postId, setPostId] = useState('');
    let [image, setImage] = useState('');
    let [like, setLike] = useState('');
    let [text, setText] = useState('');
    let [title, setTitle] = useState('');
    const [isUpdated, setIsUpdated] = useState(false)
    const [content, setContent] = useState('');
    let [commentId, setCommentId] = useState('');

    let userId = localStorage.getItem('userId')
    userId = parseInt(userId)
    const post = data.post;
    const comment = data.comment;

   const handleSubmitComment = async () => { 
  await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/comments`,
        data: {
            content,
            UserId: userId,
            CommentId :commentId
        },
        headers: {
            authorization: 'bearer ' + localStorage.getItem('token'),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            console.log(res)
            alert('Commentaire crée avec succès');
        })
        .catch((err) => alert(console.log(err))); 
 } 

   //get user pour recuperer les data du user de chaque post
    useEffect(() => {
        console.log('start useffect card : ' , post.id)
          setCreatedAt(post.createdAt);
          setUpdatedAt(post.updatedAt);
          setUid(post.UserId);
          setPostId(post.id);
          setImage(post.imageUrl);
          setLike(post.like);
          setText(post.text);
          setTitle(post.title);

            // get user
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,//post.UserId,
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
                
                //get post 
                axios.get(`${process.env.REACT_APP_API_URL}api/posts/` +post.id + `/comments`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                })
                .then((res) => {
                    setAllCommentsDatas(res.data)
                    //console.log('AllcommentsDatas', allCommentsDatas)
                })
                .catch((err) => console.log(err));
    }
, [])

    //fonction de suppression de post 
    const handleDeletePost = () => {
        if (userInfos.id === post.UserId || userInfos.isAdmin) {
            const deleteOnePost = async () => {
                await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/` + post.id,
                    {
                        headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    })
                    .then((res) => {
                        alert('vôtre post a été correctement supprimé')
                        window.location.reload();
                    })
                    .catch((err) => {
                        alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)
                    });
            }; deleteOnePost()
        } else {
            alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)
        };
    }

    //fonction de modification de post 
    const handleUpdateOnePost = () => {
        if (userInfos.id === post.UserId || userInfos.isAdmin) {
            const updateOnePost = async () => {
                if (title || text || image) {
                    await axios({
                        method: 'patch',
                        url: `${process.env.REACT_APP_API_URL}api/posts/` + post.id,
                        data: {
                            image,
                            title,
                            text
                        },
                        headers: {
                            authorization: 'bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                        .then((res) => {
                            console.log('title 4', title)
                            setAllPostsDatas(res.data)
                            alert('vôtre post a été correctement modifié')
                            setIsUpdated(false)
                            // window.location.reload();
                            console.log('AllPostsDatas from patch post', res)
                        })
                        .catch((err) => {
                            console.log(err)
                            alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
                        })
                } else {
                    alert('rien à modifié')
                }
            }; updateOnePost();
    }
}

    //fonction de suppression d'image sur un post
    const handleDeletePostPicture =async () => {
        if (userInfos.id === post.UserId || userInfos.isAdmin===true) {
                await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/` + post.id + `/image`,
                    {
                        headers: {
                            authorization: 'bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((res) => {
                        alert('vôtre image a été correctement supprimé')
                        window.location = './'
                    })
                    .catch((err) => {
                        console.log(err)
                        alert(`Désolé!vous n'êtes pas autorisé a supprimé cette image!`)
                    });
        } else {
            alert(`Aucune image à supprimer ou vous n'avez pas les droits.`)
        };
    }

    //fonction de gestion des likes sur les posts
    const handleLikePost = async () => {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/posts/` + post.id + '/like',
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
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
 
    //conversion des date et heures en jours lettre entier date 2 digit année 4 chiffres + heures minutes secondes
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
        <div className='card'>
            <div className='header-card'>
                <h3 className="userName-card" >
                    {userInfos.firstName} {userInfos.lastName}
                </h3>
                <div className='date-style-handler'>
                    <span className='creation-date'>
                        {timeStampHandler(createdAt)}
                        </span>
                    <span className='udpated-date'>
                        {timeStampHandler(updatedAt)}
                        </span>
                </div>
            </div>
            <form action=''
             className='form-update'
              onSubmit={handleUpdateOnePost}>
                <div className='post-title'>
                    {isUpdated === false && 
                    <h3>{title}</h3>}
                    {isUpdated && (
                        <div className='post-title'>
                            <label htmlFor='title-field-edit'
                             className='title-update'>
                                modification du titre
                                </label>
                            <input
                                type='text'
                                id='title-field-edit'
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    )}
                </div>
                {isUpdated === false &&
                 <div class="textContent-card" >
                    {text}
                    </div>}
                {isUpdated && 
                <div class="textContent-card" >
                    <label htmlFor='text-update'
                     className='text-update'>
                        modification du text
                        </label>
                    <textarea type='text'
                        name='text-update'
                        id='text-update'
                        defaultValue={text}
                        onChange={(e) => setText(e.target.value)}></textarea>
                </div>}
                {isUpdated === false && image ?
                 (<div className='body-card'
                  id='test2'>
                    <img src={image}
                     alt='post-picture'
                      className='post-imageUrl'>
                      </img>
                </div>) :
                 (<div className='body-card'
                  style={{ display: 'none' }}>

                  </div>
                  )}
                {isUpdated &&
                    <div >
                        <label htmlFor='image-update'
                         className='image-update'>
                            modification de l'image
                            </label>
                        <input type='file'
                            name='image-update'
                            className='image-pic'
                            id='image-update'
                            accept='.jpg, .png, .jpeg, .gif'
                            onChange={(e) => setImage(e.target.files[0])}
                        ></input>
                        <div className='delete-image-post-container'>
                            <p className='delete-image-post-title'>
                                supprimer image
                                </p>
                            <buton title='post-delete-image'
                             className='delete-image-post'
                              onClick={handleDeletePostPicture}>
                                <i class="fa-solid fa-xmark fa-lg"
                                 id='fa-x-mark-post'>
                                    </i>
                                    </buton>
                        </div>
                        <div className='body-card'>
                            <img src={image}
                             alt='post-picture'
                              className='post-imageUrl'>
                              </img>
                        </div>
                    </div>
                }
                {isUpdated === false &&
                    <input type="submit"
                        value='mettre à jour la publication'
                        className='update-profil-submit'
                        style={{ display: 'none' }} />
                }
                {isUpdated &&
                    <input type="submit"
                        value='mettre à jour la publication'
                        className='update-profil-submit'
                        style={{ display: 'flex' }}>
                        </input>
                }
            </form>
                <nav className='footer-card'
                 style={{ borderTop: 'none' }}>
                    <ul>
                        <li><button title='delete'
                         onClick={() => {
                            if (window.confirm('voulez vous vraiment supprimer vôtre publication?'))
                             { handleDeletePost(); }
                        }}><i class="fa-regular fa-trash-can">
                            </i>
                        </button>
                        </li>
                        <li>
                            <button title='update'
                                onClick={() => setIsUpdated(!isUpdated)}>
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                        </li>                        
                        <li id='like-item'>
                            <button title='like'
                             onClick={handleLikePost}>
                                <i class="fa-regular fa-heart">
                                    <span id={like ? 'post-like-number' : 'no-likes'}>
                                        {like}
                                    </span>
                                </i>
                            </button>
                        </li>
                    </ul>
                </nav>
            <div className='comments'>
                <div className='display-relative-comments'
                 onClick={() => setDisplayComments(!displayComments)}>
                    <p className='toggle-comment-title'>
                         commentaires
                         </p>
                    <span>
                        <button title='comment'
                         className='toggle-comment-button'
                          onClick={() => setDisplayComments(!displayComments)}>
                            <i class="fa-regular fa-comment">
                            </i>
                        </button>
                    </span>
                </div>
                <div>
                   {displayComments &&
                        <div className='comment-edit-and-display-container'>
                            <div className='edit-comments'>
<div>
        <div className='post-edit'>
            <h3>Entrez new comments</h3>
            <textarea 
                    type='text'
                    name='update-content'
                    placeholder='entrez vôtre commentaire'
                    className='comment-edit'
                    id='content'
                    maxLength={250}
                    onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
            <input type="submit"
             className="submit-comment"
             value="commenter"
             onClick={handleSubmitComment}
             
            />            
        </div>
            </div>
                            </div>
                            <ul id='display-all-relative-comments'>
                                {allCommentsDatas &&
                                    allCommentsDatas.reverse() &&
                                    allCommentsDatas.map((comment) => {
                                       commentId =comment.CommentId 
                                        console.log('commentId from map',commentId)
                                        console.log('postfrom map : ', comment.id)
                                        return <CommentCard comment={comment} key={comment.id} />
                                    })}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );

}

export default Card;
