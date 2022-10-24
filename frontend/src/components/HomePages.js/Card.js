import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const Card = (data) => {
    const [myPost,setMyPost] = useState('');
    const [userInfos, setUserInfos] = useState('');
    const [allPostsDatas, setAllPostsDatas] = useState('');
    let [createdAt,setCreatedAt] = useState('');
    let [updatedAt,setUpdatedAt] = useState('');
    let [uid,setUid] = useState('');
    let [postId,setPostId] = useState('');
    let [imageUrl,setImageUrl] = useState('');
    let [postLikeNumber,setPostLikeNumber] = useState('');
    let [postContentText,setPostContentText] = useState('');
    let [postTitle,setPostTitle] = useState('');
 
    const post = data.post;
   // JSON.parse(post)
    //console.log('jsonPaarse ==',JSON.parse(post))


    //setMyPost(post);

    //get user pour recuperer les data du user connecter

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + post.UserId,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setUserInfos(res.data)
                    console.log('userInfos', userInfos);
                })
                .catch((err) => console.log(err));

        };
        getUser();
    }, [Card])


    //get all posts pour recuperer un tableau de tout les posts

    useEffect(() => {
        const getAllPosts = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/posts`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setAllPostsDatas(res.data)
                    //console.log('AllPostsDatas', allPostsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllPosts()
    }, [Card])

    
//fonction pour attribuer les data d'un post a des variables ou verifier si des posts existe
    useEffect(() => {
    const handleCardDisplay = () => {
       // console.log(allPostsDatas[0].UserId)
       setCreatedAt(post.createdAt);
       //  console.log('createdAt',createdAt)
        setUpdatedAt(post.updatedAt);
       //  console.log('updatedAt',updatedAt)
        setUid(post.UserId);
       //  console.log('uid',uid);
        setPostId(post.id);
       //  console.log('postId',postId);
        setImageUrl(post.imageUrl);
       //  console.log('imageUrl',imageUrl);
        setPostLikeNumber(post.like);
       //  console.log('postLikeNumber',postLikeNumber);
        setPostContentText(post.text);
       //  console.log('postContentText',postContentText)
       setPostTitle(post.title);
       //  console.log('postTitle',postTitle);
  
    };return  handleCardDisplay();
},[userInfos])

//conversion des date et heures en jours lettre entier date 2 digit année 4 chiffres + heures minutes secondes
const timeStampHandler = (num) =>{
    let options = {
        hour: '2-digit',
        minute:'2-digit' ,
         second: '2-digit',
         weekday:'long',
         year:'numeric',
         month:'short',
        day:'numeric'
        };
        let timeStamp = Date.parse(num);
        let date = new Date(timeStamp).toLocaleDateString('fr-FR',options)

        return date.toString();

}



   // handleCardDisplay();


   /*useEffect(() => {
    const displayAllCards = async () => {
   for (let i = 0; i < allPostsDatas.length; i++){
    console.log('useEffectDisplay all cards')
   return (
        <div className='card'>
            <div className='header-card'>
                <h3 className="userName-card" >
                    {userInfos.firstName} {userInfos.lastName}
                </h3>
                <div className='date-style-handler'>
                    <span className='creation-date'>{timeStampHandler(createdAt)}</span>
                    <span className='udpated-date'>{timeStampHandler(updatedAt)}</span>
                </div>
            </div>
            <div className='post-title'>
                <h3>{postTitle}</h3>
            </div>
            <div class="textContent-card">{postContentText}</div>
            <div className='body-card'>
                <img src={imageUrl} alt='post-picture' className='post-imageUrl'></img>
            </div>
            <div className='footer-card'>
                <span><button ><i class="fa-regular fa-comment"></i></button></span>
                <span><button><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null }>{postLikeNumber}</span></i></button></span>
            </div>
        </div>
 );
}
   };displayAllCards();
},[Card])*/


return (
    <div className='card'>
        <div className='header-card'>
            <h3 className="userName-card" >
                {userInfos.firstName} {userInfos.lastName}
            </h3>
            <div className='date-style-handler'>
                <span className='creation-date'>{timeStampHandler(createdAt)}</span>
                <span className='udpated-date'>{timeStampHandler(updatedAt)}</span>
            </div>
        </div>
        <div className='post-title'>
            <h3>{postTitle}</h3>
        </div>
        <div class="textContent-card">{postContentText}</div>
        <div className='body-card'>
            <img src={imageUrl} alt='post-picture' className='post-imageUrl'></img>
        </div>
        <div className='footer-card'>
            <span><button ><i class="fa-regular fa-comment"></i></button></span>
            <span><button><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null }>{postLikeNumber}</span></i></button></span>
        </div>
    </div>
);

}
export default Card;
