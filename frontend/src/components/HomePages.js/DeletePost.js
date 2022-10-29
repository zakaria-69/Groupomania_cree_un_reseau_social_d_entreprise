/*import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';

const DeletePost = (Card) => {
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
 
    const post = Card.post;
   // JSON.parse(post)
    //console.log('jsonPaarse ==',JSON.parse(post))
    //setMyPost(post);

    //get user pour recuperer les data du user connecter

   /* useEffect(() => {
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
    }, [])


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
    }, [])


    //fonction de suppression de post 
        const handleDeletePost= () =>{
           
        const deleteOnePost = async () => {
                       await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/` + post.id,
                            {
                                headers: { authorization: 'bearer ' + localStorage.getItem('token')} ,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
            
                            })
                            .then((res) => {
                                setAllPostsDatas(res.data)
                                alert('vôtre post a été correctement supprimé')
                                window.location.reload();
                                alert(res.response.data.message)
                                 //console.log('AllPostsDatas', allPostsDatas)
                            })
                           // console.log(res.response.data.message)
                            .catch((err) => alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`));

                            
                    }; deleteOnePost()
                
           
        };




    
    
//fonction pour attribuer les data d'un post a des variables ou verifier si des posts existe
   /* useEffect(() => {
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

  
        return (
            <li><button title='delete'  onClick={() =>{
                if(window.confirm('voulez vous vraiment supprimer vôtre publication?'))
               {handleDeletePost();}
            }}><i class="fa-regular fa-trash-can"></i></button></li>
        );
    }

export default DeletePost;*/